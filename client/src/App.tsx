import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// Lazy-loaded pages for code-splitting
const Home = lazy(() => import("./pages/Home"));
const Articles = lazy(() => import("./pages/Articles"));
const Speaking = lazy(() => import("./pages/Speaking"));
const Videos = lazy(() => import("./pages/Videos"));
const Events = lazy(() => import("./pages/Events"));
const Courses = lazy(() => import("./pages/Courses"));
const Contact = lazy(() => import("./pages/Contact"));
const Conversations = lazy(() => import("./pages/Conversations"));
const ContentDetail = lazy(() => import("./pages/ContentDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));
const TagPage = lazy(() => import("./pages/TagPage"));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: "var(--color-nd-terracotta)", borderTopColor: "transparent" }}
        />
        <span className="nd-meta text-sm">Loading...</span>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/articles" component={Articles} />
        <Route path="/speaking" component={Speaking} />
        <Route path="/videos" component={Videos} />
        <Route path="/events" component={Events} />
        <Route path="/courses" component={Courses} />
        <Route path="/contact" component={Contact} />
        <Route path="/conversations" component={Conversations} />
        {/* Tag aggregation page */}
        <Route path="/tag/:tag" component={TagPage} />
        {/* Dynamic detail pages — wouter wildcard syntax */}
        <Route path="/articles/*" component={ContentDetail} />
        <Route path="/videos/*" component={ContentDetail} />
        <Route path="/presentations/*" component={ContentDetail} />
        <Route path="/events/*" component={ContentDetail} />
        <Route path="/courses/*" component={ContentDetail} />
        <Route path="/conversations/*" component={ContentDetail} />
        <Route path="/404" component={NotFound} />
        {/* Final fallback */}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
