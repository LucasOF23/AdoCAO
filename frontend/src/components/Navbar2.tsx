import Image from "next/image";

export default function Navbar2() {
  return (
    <>
      <div className="z-10 border-b-2 h-20 shadow-sm sticky top-0 bg-white">
        <div className="mx-auto screen-max-width px-4 h-full flex flex-row justify-between align-middle">
          <Image alt="AdoCÃO logo" src="/logo.svg" width={200} height={200} />
          <details className="absolute right-10 top-4 dropdown content-center">
            <summary className="btn hover:bg-purple-400 duration-75 hover:scale-[105%] px-5 py-3 rounded-xl transition ease-in-out delay-150 dropdown-content m-auto">Menu</summary>
            <ul className="p-1 shadow menu z-[1] bg-white rounded-box">
              <li className="hover:bg-gray-500"><a href="/perfil" className="perfil"><button className="w-full p-2">Perfil</button></a></li>
              <hr />
              <li className="hover:bg-gray-500"><a href="/home" className="home"><button className="w-full p-2">Home</button></a></li>
              <hr />
              <li className="hover:bg-gray-500"><a href="/postagens" className="postagens"><button className="w-full p-2">Minhas Postagens</button></a></li>
              <hr />
              <li className="hover:bg-gray-500"><a href="/ongs" className="ongs"><button className="w-full p-2">ONG's</button></a></li>
              <hr />
              <li className="hover:bg-gray-500"><a href="/my_ongs" className="my_ongs"><button className="w-full p-2">Minhas ONG's</button></a></li>
            </ul>
          </details>
        </div>
      </div>
    </>
  );
}
