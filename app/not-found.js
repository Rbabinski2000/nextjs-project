import Link from "next/link";

function notFound(){
return(
    <div>
        <p>Nie ma takiej sciezki!!!!!</p>
        <Link href="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded pt-30">Powrót</Link>
    </div>

)

}


export default notFound