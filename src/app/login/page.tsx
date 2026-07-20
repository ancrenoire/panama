import type { Metadata } from "next";
import content from "@/data/content.json";
import { unlock } from "./actions";

export const metadata: Metadata = {
  title: `Accès — ${content.meta.title}`,
  robots: { index: false, follow: false },
};

type LoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { error } = await searchParams;
  const hasError = error === "1";

  return (
    <main className="gate">
      <div className="gate__panel">
        <img
          className="gate__logo"
          src={content.brand.logoSrc}
          alt={content.brand.name}
          width={140}
          height={32}
        />
        <h1 className="gate__title">Accès protégé</h1>
        <p className="gate__lead">
          Entrez le mot de passe pour continuer.
        </p>
        <form className="gate__form" action={unlock}>
          <label className="gate__label" htmlFor="password">
            Mot de passe
          </label>
          <input
            id="password"
            className="gate__input"
            type="password"
            name="password"
            autoComplete="current-password"
            required
            autoFocus
            aria-invalid={hasError || undefined}
            aria-describedby={hasError ? "gate-error" : undefined}
          />
          {hasError ? (
            <p id="gate-error" className="gate__error" role="alert">
              Mot de passe incorrect.
            </p>
          ) : null}
          <button className="btn btn--primary gate__submit" type="submit">
            Entrer
          </button>
        </form>
      </div>
    </main>
  );
}
