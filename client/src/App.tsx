import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, useLocation } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// Eager imports — eliminates blank flash during SPA navigation
import Home from "./pages/Home";
import Articles from "./pages/Articles";
import Speaking from "./pages/Speaking";
import Videos from "./pages/Videos";
import Events from "./pages/Events";
import Courses from "./pages/Courses";
import Contact from "./pages/Contact";
import Conversations from "./pages/Conversations";
import ContentDetail from "./pages/ContentDetail";
import NotFound from "./pages/NotFound";
import TagPage from "./pages/TagPage";

/** Scroll to top whenever the route changes */
function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [location]);
  return null;
}

/** Page transition wrapper */
const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const pageTransition = {
  duration: 0.2,
  ease: [0.25, 0.1, 0.25, 1] as const,
};

function AnimatedRoutes() {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
      >
        <Switch location={location}>
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
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <ScrollToTop />
          <AnimatedRoutes />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
