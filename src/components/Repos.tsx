// REPOS.JSX
import { useParams } from "react-router-dom"; // Hook para capturar parâmetros da URL
import { Link } from "react-router-dom"; // Navegação com links
import { useEffect, useState } from "react"; // Gerenciamento de estado e efeitos colaterais
import { AiOutlineStar, AiOutlineFork } from "react-icons/ai"; // Ícones para estrelas e forks
import { BsCodeSlash } from "react-icons/bs"; // Ícone para linguagem de programação
import { RiGitRepositoryLine } from "react-icons/ri"; // Ícone para repositórios
import classes from "./Repos.module.css"; // Importação do CSS correspondente

// Interface que define os dados esperados de um repositório
interface RepoProps {
  name: string; // Nome do repositório
  language: string; // Linguagem utilizada
  stargazers_count: number; // Número de estrelas
  forks_count: number; // Número de forks
  html_url: string; // URL do repositório no GitHub
}

// Componente principal
const Repos = () => {
  const { login } = useParams<{ login: string }>(); // Captura o parâmetro 'login' da URL
  const [repos, setRepos] = useState<RepoProps[]>([]); // Estado para armazenar os repositórios

  // Função para buscar os repositórios do usuário no GitHub
  const fetchRepos = async (login: string) => {
    try {
      const response = await fetch(`https://api.github.com/users/${login}/repos`);
      const data = await response.json();

      // Ordena os repositórios por estrelas em ordem decrescente
      const sortedRepos = data.sort(
        (a: RepoProps, b: RepoProps) => b.stargazers_count - a.stargazers_count
      );

      // Seleciona os 3 repositórios mais populares
      const topRepos = sortedRepos.slice(0, 3);
      setRepos(topRepos); // Atualiza o estado com os repositórios
    } catch (error) {
      console.error("Erro ao buscar repositórios:", error);
    }
  };

  useEffect(() => {
    if (login) {
      fetchRepos(login); // Carrega os repositórios ao montar o componente
    }
  }, [login]);

  return (
    <div>
      {/* Botão para voltar à página inicial */}
      <div>
        <button className={classes.back_btn}>
          <Link to="/">Voltar</Link>
        </button>
      </div>

      {/* Cabeçalho do componente */}
      <div className={classes.h1}>
        <h1>Github Finder</h1>
      </div>
      <div className={classes.h3}>
        <h3>Explore os repositórios do usuário: {login}</h3>
      </div>

      {/* Exibição dos repositórios */}
      <div>
        <div className={classes.div1}>
          {/* Se houver repositórios, exibe os mais populares */}
          {repos.length > 0 ? (
            repos.map((repo) => (
              <div key={repo.name} className={classes.divp}>
                <p className={classes.nome}>
                  <strong>{repo.name}</strong>
                </p>
                <p className={classes.linguaguem}>
                  <BsCodeSlash /> {repo.language || "N/A"}
                </p>
                <p className={classes.span}>
                  <span className={classes.stats}>
                    <AiOutlineStar /> {repo.stargazers_count}
                  </span>
                </p>
                <p className={classes.span2}>
                  <span className={classes.stats}>
                    <AiOutlineFork /> {repo.forks_count}
                  </span>
                </p>
                <a
                  className={classes.repo_btn}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver Código <RiGitRepositoryLine />
                </a>
              </div>
            ))
          ) : (
            // Caso não haja repositórios, exibe uma mensagem informativa
            <p className={classes.no_repos}>
              Este usuário não possui repositórios públicos ou não existe.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Repos;
