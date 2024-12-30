type SearchProps = {
    loadUser: (userName: string) => Promise<void>;
};


import { BsSearch } from "react-icons/bs";

import { useState } from "react";

import Classes from "./Search.module.css";


const Search = ({loadUser}: SearchProps) =>  {
    const [userName, setUserName] = useState("");
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "enter") {
          loadUser(userName)
      }
    };

    return (
      <div className={Classes.search}>
        <h2>Busque por um usuário:</h2>
        <p>conheça seus melhores repositorios</p>
        <div className={Classes.search_container}>
            <input type="text" placeholder="Digite o numero do usuário" 
            onChange={(e) => setUserName(e.target.value)}
            onKeyDown={handleKeyDown}
            />
            <button onClick={() => loadUser(userName)}>
                <BsSearch/>
            </button>
        </div>
      </div>
    )
};

export default Search;