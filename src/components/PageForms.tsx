export default function PageForms() {
    return (
    <div className="w-full h-full bg-indigo-400 p-4">
        <h1 className="font-bold text-3xl text-center">FORMULÁRIO DO PET</h1>
        <hr className="my-5" />
        <div className="p-4">
            <h1 className="text-center text-xl font-bold">INFORMAÇÕES DO RESPONSÁVEL</h1>
            <div className="my-3">
                <h1>Nome do Responsável:</h1>
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs border-2" />
            </div>
            <div className="my-3">
                <h1>Email:</h1>
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs border-2" />
            </div>
            <div className="my-3">
                <h1>Celular:</h1>
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs border-2" />
            </div>
            <div className="my-3">
                <select className="select select-bordered w-full max-w-xs">
                    <option disabled selected>Estado</option>
                    <option>MG</option>
                    <option>RJ</option>
                    <option>SP</option>
                    <option>SC</option>
                </select>
            </div>
            <div className="my-3">
                <h1>Cidade:</h1>
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs border-2" />
            </div>
        
        </div>
        <hr className="my-5" />
        <div className="p-4">
            <h1 className="text-center text-xl font-bold">INFORMAÇÕES DO PET</h1>
            <div className="my-3">
                <h1>Nome do Animal:</h1>
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs border-2" />
            </div>
            <div className="my-3">
                <select className="select select-bordered w-full max-w-xs">
                    <option disabled selected>Espécie</option>
                    <option>Cachorro</option>
                    <option>Gato</option>
                    <option>Pássaro</option>
                </select>
            </div>
            <div className="my-3">
                <h1>Raça:</h1>
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs border-2" />
            </div>
            <div className="my-3">
                <select className="select select-bordered w-full max-w-xs">
                    <option disabled selected>Sexo</option>
                    <option>Macho</option>
                    <option>Fêmea</option>
                </select>
            </div>
            <div className="my-3">
                <h1>Idade:</h1>
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs border-2" />
            </div>
            <div className="my-3">
                <h1>Peso:</h1>
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs border-2" />
            </div>
            <div className="my-3">
                <select className="select select-bordered w-full max-w-xs">
                    <option disabled selected>Porte</option>
                    <option>Grande</option>
                    <option>Médio</option>
                    <option>Pequeno</option>
                </select>
            </div>
            <div className="my-3">
                <details className="dropdown">
                    <summary className="m-1 btn border-2 p-2">Tags</summary>
                    <ul className="p-2 shadow menu dropdown-content z-[1] bg-white rounded-box w-52">
                        <li>
                            <h1 className="inline-block">Tranquilo(a)</h1>
                            <input type="checkbox" className="toggle m-5" />
                        </li>
                        <li>
                            <h1 className="inline-block">Fofo(a)</h1>
                            <input type="checkbox" className="toggle m-5" />
                        </li>
                        <li>
                            <h1 className="inline-block">Esperto(a)</h1>
                            <input type="checkbox" className="toggle m-5" />
                        </li>
                        <li>
                            <h1 className="inline-block">Energético(a)</h1>
                            <input type="checkbox" className="toggle m-5" />
                        </li>
                    </ul>
                </details>
            </div>
            <div className="my-3">
                <h1 className="inline-block">Castrado:</h1>
                <input type="checkbox" className="toggle m-5" />
                <h1 className="inline-block">Vermifugado:</h1>
                <input type="checkbox" className="toggle m-5" />
            </div>
            <div className="my-3">
                <h1>Descrição:</h1>
                <textarea className="textarea textarea-bordered w-full"></textarea>
            </div>
            <div>
                <h1>Imagem do Animal:</h1>
                <input type="file" className="file-input file-input-bordered w-full max-w-xs" />
            </div>
        </div>
        <div className="text-center content-center">
            <button className="text-3xl font-bold rounded-md bg-white text-center p-5">Enviar</button>
        </div>
    </div>

    );
}