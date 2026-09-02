import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Congratulations On Your New Volkswagen T - Cross R Line" },
      { name: "description", content: "A cinematic celebration of a remarkable milestone. Experience the story, the journey, and the unforgattable moment of receiving a brand new VW T-Cross R-Line." },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Congratulations On Your New Volkswagen T - Cross R Line" },
      { property: "og:description", content: "A cinematic celebration of a remarkable milestone. Experience the story, the journey, and the unforgattable moment of receiving a brand new VW T-Cross R-Line." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Congratulations On Your New Volkswagen T - Cross R Line" },
      { name: "twitter:description", content: "A cinematic celebration of a remarkable milestone. Experience the story, the journey, and the unforgattable moment of receiving a brand new VW T-Cross R-Line." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/4eZKF1SFMHgA9rNwurv57OlZqhq1/social-images/social-1785735649263-social-image.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/4eZKF1SFMHgA9rNwurv57OlZqhq1/social-images/social-1785735649263-social-image.webp" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300&family=Karla:wght@300;400;500&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

/**
 * Critical CSS, inlined so the cinematic frame (dark canvas, serif display
 * type, centered title cards) survives even if the external stylesheet is
 * missing or slow on a self-hosted deployment.
 */
const criticalCss = `
html,body{margin:0;background:#0a0b0d;color:#f6f5f1}
body{font-family:"Karla",system-ui,sans-serif;-webkit-font-smoothing:antialiased}
.cinema{background:#0a0b0d;color:#f6f5f1;overflow-x:hidden;text-align:center}
.cinema h1,.cinema h2,.cinema h3,.cinema p,.cinema figcaption{text-align:center;margin-left:auto;margin-right:auto}
.cinema img{display:block;width:100%;height:100%;object-fit:cover}
`;

/**
 * Hydration watchdog. Framer Motion server-renders its pre-animation state
 * inline (opacity:0, translateY), so a client bundle that never executes
 * would leave a blank page. The class is removed the moment React mounts;
 * if it is still present after the timeout, .motion-fallback reveals
 * everything via CSS (see styles.css "Resilience layer").
 */
const hydrationWatchdog = `
(function(){var d=document.documentElement;d.classList.add('pre-hydrate');
setTimeout(function(){if(d.classList.contains('pre-hydrate')){d.classList.add('motion-fallback');}},4000);})();
`;

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <style dangerouslySetInnerHTML={{ __html: criticalCss }} />
        <script dangerouslySetInnerHTML={{ __html: hydrationWatchdog }} />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  // Hydration succeeded — stand the watchdog down and hand motion back to JS.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("pre-hydrate");
    root.classList.remove("motion-fallback");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}

