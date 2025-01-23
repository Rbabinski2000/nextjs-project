import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-3xl sm:text-5xl font-bold text-center sm:text-left">
          Witaj w mojej aplikacji!
        </h1>
        <p className="text-lg sm:text-xl leading-relaxed max-w-3xl text-center sm:text-left">
          Moja aplikacja oferuje kompleksowe narzędzia do zarządzania treściami i zadaniami. 
          Oto najważniejsze funkcjonalności:
        </p>
        <ul className="text-base sm:text-lg list-disc list-inside max-w-3xl">
          <li>
            <strong>Logowanie i rejestracja użytkowników</strong>: umożliwia tworzenie kont 
            i dostęp do indywidualnych zasobów.
          </li>
          <li>
            <strong>Strona profilu</strong>: zawiera dane użytkownika i umożliwia ich edycję.
          </li>
          <li>
            <strong>Strona z artykułami</strong>: przechowuje artykuły przypisane do użytkowników.
          </li>
          <li>
            <strong>Kalendarz z widokiem tygodniowym</strong>: pozwala planować zajęcia 
            z tytułem i opisem. Te zajęcia są widoczne wyłącznie dla zalogowanego użytkownika.
          </li>
        </ul>
        
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
