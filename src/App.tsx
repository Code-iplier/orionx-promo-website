import {
  Component,
  Suspense,
  lazy,
  useEffect,
  useRef,
  useState,
  type ElementType,
  type MouseEvent,
  type ReactNode,
} from 'react';
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  CssBaseline,
  Grid,
  Link,
  Menu,
  MenuItem,
  IconButton,
  Stack,
  SvgIcon,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
  type SxProps,
  type Theme,
  type TypographyProps,
} from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import ForumIcon from '@mui/icons-material/Forum';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InstagramIcon from '@mui/icons-material/Instagram';
import MenuIcon from '@mui/icons-material/Menu';

const Spline = lazy(() => import('@splinetool/react-spline'));

function DiscordIcon() {
  return (
    <SvgIcon viewBox="0 0 24 24" fontSize="small" aria-hidden="true">
      <path
        fill="currentColor"
        d="M20.32 4.37a19.8 19.8 0 0 0-4.88-1.52l-.23.42c2.11.53 3.08 1.3 3.08 1.3a14.98 14.98 0 0 0-4.54-.68c-1.53 0-3.05.2-4.53.68 0 0 .97-.77 3.08-1.3l-.23-.42c-1.7.3-3.34.82-4.88 1.52C3.45 9.64 2.43 14.77 2.94 19.84A19.9 19.9 0 0 0 8.9 22l.5-.83a12.96 12.96 0 0 1-2.6-1.24l.62-.49c2.14 1.03 4.61 1.55 7.08 1.55s4.94-.52 7.08-1.55l.62.49c-.82.52-1.7.94-2.6 1.24l.5.83a19.9 19.9 0 0 0 5.96-2.16c.61-5.89-.73-10.97-5.68-15.47M9.77 16.78c-1.13 0-2.06-1.03-2.06-2.3s.91-2.3 2.06-2.3c1.16 0 2.08 1.04 2.06 2.3 0 1.27-.91 2.3-2.06 2.3m7.6 0c-1.13 0-2.06-1.03-2.06-2.3s.91-2.3 2.06-2.3c1.16 0 2.08 1.04 2.06 2.3 0 1.27-.9 2.3-2.06 2.3"
      />
    </SvgIcon>
  );
}

function TypewriterText({
  text,
  speed = 45,
  startDelay = 0,
  variant,
  color,
  component = 'p',
  sx,
}: {
  text: string;
  speed?: number;
  startDelay?: number;
  variant?: TypographyProps['variant'];
  color?: string;
  component?: ElementType;
  sx?: SxProps<Theme>;
}) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, speed);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [started, text, speed, startDelay]);

  return (
    <Typography
      ref={ref}
      variant={variant}
      color={color}
      component={component}
      sx={sx}
    >
      {displayed}
      {started && displayed.length < text.length && (
        <Box
          component="span"
          className="typewriter-cursor"
          sx={{ animation: 'blink 0.7s step-end infinite', ml: 0.25 }}
        >
          |
        </Box>
      )}
    </Typography>
  );
}

function canUseWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl2 = canvas.getContext('webgl2');
    if (gl2) {
      return true;
    }
    const gl =
      canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return Boolean(gl);
  } catch {
    return false;
  }
}

type SplineBoundaryProps = { children: ReactNode };
type SplineBoundaryState = { hasError: boolean };

class SplineErrorBoundary extends Component<
  SplineBoundaryProps,
  SplineBoundaryState
> {
  state: SplineBoundaryState = { hasError: false };

  static getDerivedStateFromError(): SplineBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 3 }}>
          <Typography color="text.secondary">
            The interactive experience is temporarily unavailable on this
            device.
          </Typography>
        </Box>
      );
    }

    return this.props.children;
  }
}

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#d4af37' },
    secondary: { main: '#f2d27a' },
    background: {
      default: '#1f2125',
      paper: '#2a2d33',
    },
    text: {
      primary: '#f5f2e8',
      secondary: '#c8c1af',
    },
  },
  shape: { borderRadius: 16 },
  typography: {
    fontFamily: '"Inter", "Segoe UI", "Roboto", sans-serif',
    h1: { fontWeight: 700, letterSpacing: -0.4 },
    h2: { fontWeight: 700 },
  },
});

const conceptPages = [
  {
    label: 'Space Missions',
    path: '/concepts/space-missions',
    description:
      'Explore legendary missions, current deep-space programs, and future human exploration roadmaps across the solar system.',
  },
  {
    label: 'Constellations',
    path: '/concepts/constellations',
    description:
      'Learn how constellations are mapped, named, and used to navigate the night sky across cultures and time.',
  },
  {
    label: 'Planets',
    path: '/concepts/planets',
    description:
      'Understand planetary formation, atmospheres, habitability, and the latest discoveries in exoplanet research.',
  },
  {
    label: 'Galaxies',
    path: '/concepts/galaxies',
    description:
      'Dive into galaxy types, dark matter structures, and how galaxies evolve and interact over cosmic timescales.',
  },
  {
    label: 'BlackHoles',
    path: '/concepts/blackholes',
    description:
      'Discover event horizons, singularities, Hawking radiation, and how black holes shape surrounding cosmic systems.',
  },
  {
    label: 'Wormholes',
    path: '/concepts/wormholes',
    description:
      'Explore the theory behind spacetime tunnels, their physics constraints, and their role in modern sci-fi and research.',
  },
];

const discussionPage = {
  label: 'Discussion Page',
  path: '/community/discussion',
};

const blogPage = {
  label: 'Blog',
  path: '/blog',
};

const features = [
  {
    title: 'Space Concepts, Simplified',
    description:
      'From black holes to orbital mechanics, OrionX breaks down tough ideas into visual stories and short explainers.',
    icon: <AutoStoriesIcon color="primary" aria-hidden="true" />,
  },
  {
    title: 'Interactive Exploration',
    description:
      'Navigate a living 3D universe with Spline-powered scenes that make astrophysics feel tangible and engaging.',
    icon: <PublicIcon color="primary" aria-hidden="true" />,
  },
  {
    title: 'Fact-Driven Discussion Hubs',
    description:
      'Join structured discussion spaces where learners, enthusiasts, and experts exchange verified space insights.',
    icon: <ForumIcon color="primary" aria-hidden="true" />,
  },
];

const spaceVisuals = [
  {
    title: 'Space Astronaut',
    image: '/space-visuals/visual-1.jpg',
    description: 'The coolest people to exist ever.',
  },
  {
    title: 'Planetary Horizon',
    image: '/space-visuals/visual-2.jpg',
    description:
      'A cinematic planetary edge view showing atmosphere glow and orbital scale.',
  },
  {
    title: 'Galactic Core',
    image: '/space-visuals/visual-3.jpg',
    description:
      'Dense star populations and dust lanes surrounding a dynamic galactic center.',
  },
  {
    title: 'Stellar Field',
    image: '/space-visuals/visual-4.jpg',
    description:
      'Wide-angle star landscape built for immersive cosmic storytelling.',
  },
  {
    title: 'A Gassy Giant',
    image: '/space-visuals/visual-5.jpg',
    description: 'Jupiter the largest planet in our solar system.',
  },
  {
    title: 'Interstellar Wormhole',
    image: '/space-visuals/visual-6.jpg',
    description: 'A Stunning space shortcut, a tunnel through spacetime.',
  },
  {
    title: 'Black Holes',
    image: '/space-visuals/visual-7.jpg',
    description:
      'A space object so dense, that its gravitational pull does not even let light escape',
  },
  {
    title: 'Aurora Orbit',
    image: '/space-visuals/visual-8.jpg',
    description:
      'A wide, cinematic space panorama built for OrionX storytelling visuals.',
  },
];

export default function App() {
  const [interactiveEnabled, setInteractiveEnabled] = useState(false);
  const [webglAvailable] = useState(() => canUseWebGL());
  const [activeVisualIndex, setActiveVisualIndex] = useState(0);
  const [prevVisualIndex, setPrevVisualIndex] = useState<number | null>(null);
  const [currentPath, setCurrentPath] = useState(
    () => window.location.pathname || '/',
  );
  const [conceptMenuAnchor, setConceptMenuAnchor] =
    useState<HTMLElement | null>(null);
  const [communityMenuAnchor, setCommunityMenuAnchor] =
    useState<HTMLElement | null>(null);
  const [mobileNavAnchor, setMobileNavAnchor] = useState<HTMLElement | null>(
    null,
  );
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {});
  }, []);

  useEffect(() => {
    const handler = () => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.volume = 0.2;
      audio.play().catch(() => {});
    };
    document.addEventListener('click', handler, { once: true });
    document.addEventListener('touchend', handler, { once: true });
    document.addEventListener('keydown', handler, { once: true });
    return () => {
      document.removeEventListener('click', handler);
      document.removeEventListener('touchend', handler);
      document.removeEventListener('keydown', handler);
    };
  }, []);

  useEffect(() => {
    const onPopState = () => setCurrentPath(window.location.pathname || '/');
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigateTo = (path: string) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setConceptMenuAnchor(null);
    setCommunityMenuAnchor(null);
    setMobileNavAnchor(null);
  };

  const navigateHomeSection = (sectionId: string) => {
    if (window.location.pathname !== '/') {
      window.history.pushState({}, '', '/');
      setCurrentPath('/');
      setMobileNavAnchor(null);
      window.setTimeout(() => {
        document
          .getElementById(sectionId)
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 0);
      return;
    }
    setMobileNavAnchor(null);
    document
      .getElementById(sectionId)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const selectedConcept = conceptPages.find(
    (item) => item.path === currentPath,
  );
  const isDiscussionPage = currentPath === discussionPage.path;
  const isBlogPage = currentPath === blogPage.path;

  useEffect(() => {
    if (selectedConcept || isDiscussionPage || isBlogPage) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveVisualIndex((prev) => {
        setPrevVisualIndex(prev);
        return (prev + 1) % spaceVisuals.length;
      });
    }, 4000);

    return () => window.clearInterval(intervalId);
  }, [selectedConcept, isDiscussionPage, isBlogPage]);

  const goToPrevVisual = () => {
    setPrevVisualIndex(activeVisualIndex);
    setActiveVisualIndex(
      (prev) => (prev - 1 + spaceVisuals.length) % spaceVisuals.length,
    );
  };

  const goToNextVisual = () => {
    setPrevVisualIndex(activeVisualIndex);
    setActiveVisualIndex((prev) => (prev + 1) % spaceVisuals.length);
  };

  const openConceptMenu = (event: MouseEvent<HTMLElement>) => {
    setConceptMenuAnchor(event.currentTarget);
  };

  const openCommunityMenu = (event: MouseEvent<HTMLElement>) => {
    setCommunityMenuAnchor(event.currentTarget);
  };

  const openMobileNavMenu = (event: MouseEvent<HTMLElement>) => {
    setMobileNavAnchor(event.currentTarget);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        component="a"
        href="#main-content"
        sx={{
          position: 'absolute',
          left: '-9999px',
          top: 12,
          zIndex: 2000,
          bgcolor: 'secondary.main',
          color: '#130b00',
          px: 2,
          py: 1,
          borderRadius: 1,
          '&:focus': { left: 12 },
        }}
      >
        Skip to content
      </Box>

      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: 'rgba(31, 33, 37, 0.88)',
          borderBottom: '1px solid rgba(212, 175, 55, 0.35)',
          backdropFilter: 'blur(10px)',
          pt: 'env(safe-area-inset-top)',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 72 } }}>
            <RocketLaunchIcon
              sx={{ mr: 1, color: 'secondary.main' }}
              aria-hidden="true"
            />
            <Typography
              variant="h6"
              component="button"
              onClick={() => navigateTo('/')}
              sx={{
                fontWeight: 800,
                letterSpacing: 0.6,
                border: 0,
                bgcolor: 'transparent',
                color: 'text.primary',
                cursor: 'pointer',
              }}
            >
              OrionX
            </Typography>
            <Stack
              direction="row"
              spacing={3}
              sx={{ ml: 'auto', display: { xs: 'none', md: 'flex' } }}
            >
              <Link
                component="button"
                onClick={() => navigateHomeSection('mission')}
                color="text.secondary"
                underline="none"
                sx={{ fontWeight: 600 }}
              >
                Mission
              </Link>
              <Link
                component="button"
                onClick={() => navigateHomeSection('experience')}
                color="text.secondary"
                underline="none"
                sx={{ fontWeight: 600 }}
              >
                Experience
              </Link>
              <Link
                component="button"
                onClick={() => navigateTo(blogPage.path)}
                color="text.secondary"
                underline="none"
                sx={{ fontWeight: 600 }}
              >
                Blog
              </Link>
              <Button
                variant="text"
                color="inherit"
                onClick={openConceptMenu}
                endIcon={<KeyboardArrowDownIcon />}
                sx={{ fontWeight: 600 }}
              >
                Concepts
              </Button>
              <Button
                variant="text"
                color="inherit"
                onClick={openCommunityMenu}
                endIcon={<KeyboardArrowDownIcon />}
                sx={{ fontWeight: 600 }}
              >
                Community
              </Button>
            </Stack>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigateHomeSection('join')}
              sx={{ ml: 2, display: { xs: 'none', md: 'inline-flex' } }}
            >
              JOIN US
            </Button>
            <IconButton
              color="inherit"
              onClick={openMobileNavMenu}
              aria-label="Open navigation menu"
              sx={{ ml: 'auto', display: { xs: 'inline-flex', md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Menu
        anchorEl={conceptMenuAnchor}
        open={Boolean(conceptMenuAnchor)}
        onClose={() => setConceptMenuAnchor(null)}
      >
        {conceptPages.map((concept) => (
          <MenuItem key={concept.path} onClick={() => navigateTo(concept.path)}>
            {concept.label}
          </MenuItem>
        ))}
      </Menu>
      <Menu
        anchorEl={communityMenuAnchor}
        open={Boolean(communityMenuAnchor)}
        onClose={() => setCommunityMenuAnchor(null)}
      >
        <MenuItem onClick={() => navigateTo(discussionPage.path)}>
          {discussionPage.label}
        </MenuItem>
      </Menu>
      <Menu
        anchorEl={mobileNavAnchor}
        open={Boolean(mobileNavAnchor)}
        onClose={() => setMobileNavAnchor(null)}
      >
        <MenuItem onClick={() => navigateTo('/')}>Main Page</MenuItem>
        <MenuItem onClick={() => navigateHomeSection('mission')}>
          Mission
        </MenuItem>
        <MenuItem onClick={() => navigateHomeSection('experience')}>
          Experience
        </MenuItem>
        <MenuItem onClick={() => navigateTo(blogPage.path)}>Blog</MenuItem>
        {conceptPages.map((concept) => (
          <MenuItem
            key={`mobile-${concept.path}`}
            onClick={() => navigateTo(concept.path)}
          >
            {concept.label}
          </MenuItem>
        ))}
        <MenuItem onClick={() => navigateTo(discussionPage.path)}>
          {discussionPage.label}
        </MenuItem>
        <MenuItem onClick={() => navigateHomeSection('join')}>
          Join Waitlist
        </MenuItem>
      </Menu>

      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <Box
          component="video"
          ref={videoRef}
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        >
          <source src="/hero-background.mp4" type="video/mp4" />
        </Box>
        <Box
          component="audio"
          ref={audioRef}
          loop
          preload="auto"
          sx={{ display: 'none' }}
        >
          <source src="/hero-audio.mp3" type="audio/mpeg" />
        </Box>
      </Box>

      <Box
        component="main"
        id="main-content"
        sx={{ position: 'relative', zIndex: 1 }}
      >
        {selectedConcept ? (
          <Container maxWidth="md" sx={{ py: { xs: 8, md: 12 } }}>
            <Stack spacing={3}>
              <Chip
                label="OrionX Concepts"
                color="primary"
                variant="outlined"
                sx={{ width: 'fit-content' }}
              />
              <Typography component="h1" variant="h3">
                {selectedConcept.label}
              </Typography>
              <Typography color="text.secondary">
                {selectedConcept.description}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigateTo('/')}
              >
                Back to Main Page
              </Button>
            </Stack>
          </Container>
        ) : isDiscussionPage ? (
          <Container maxWidth="md" sx={{ py: { xs: 8, md: 12 } }}>
            <Stack spacing={3}>
              <Chip
                label="OrionX Community"
                color="secondary"
                variant="outlined"
                sx={{ width: 'fit-content' }}
              />
              <Typography component="h1" variant="h3">
                Anonymous Space Discussion
              </Typography>
              <Typography color="text.secondary">
                This page is reserved for anonymous, topic-focused conversations
                where users can discuss missions, discoveries, theories, and
                questions about space without sharing personal identity.
              </Typography>
              <Card
                className="jump-card"
                sx={{ border: '1px solid rgba(212, 175, 55, 0.25)' }}
              >
                <CardContent>
                  <Typography color="text.secondary">
                    Discussion feature coming next: anonymous posting, threaded
                    replies, moderation, and topic channels.
                  </Typography>
                </CardContent>
              </Card>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigateTo('/')}
              >
                Back to Main Page
              </Button>
            </Stack>
          </Container>
        ) : isBlogPage ? (
          <Container maxWidth="md" sx={{ py: { xs: 8, md: 12 } }}>
            <Stack spacing={3}>
              <Chip
                label="OrionX Blog"
                color="primary"
                variant="outlined"
                sx={{ width: 'fit-content' }}
              />
              <Typography component="h1" variant="h3">
                OrionX Space Blog
              </Typography>
              <Typography color="text.secondary">
                Articles, discoveries, and deep dives into space science,
                missions, and cosmic phenomena — written by the community for
                the curious.
              </Typography>
              <Card
                className="jump-card"
                sx={{ border: '1px solid rgba(212, 175, 55, 0.25)' }}
              >
                <CardContent>
                  <Typography color="text.secondary">
                    Blog posts coming soon. Stay tuned for community-written
                    space articles submitted to{' '}
                    <Link
                      href="mailto:submissions@orionx.space"
                      color="text.secondary"
                      underline="always"
                    >
                      submissions@orionx.space
                    </Link>
                    .
                  </Typography>
                </CardContent>
              </Card>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigateTo('/')}
              >
                Back to Main Page
              </Button>
            </Stack>
          </Container>
        ) : (
          <>
            <Box
              component="section"
              sx={{
                position: 'relative',
                overflow: 'hidden',
                minHeight: { xs: '72svh', md: 700 },
                display: 'flex',
                alignItems: 'center',
                mb: { xs: 5, md: 8 },
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 1,
                  background:
                    'linear-gradient(180deg, rgba(26, 28, 32, 0.62) 0%, rgba(26, 28, 32, 0.84) 100%)',
                }}
                aria-hidden="true"
              />
              <Container
                maxWidth="lg"
                sx={{ py: { xs: 8, md: 16 }, position: 'relative', zIndex: 2 }}
              >
                <Stack spacing={3} sx={{ maxWidth: 760 }}>
                  <Chip
                    label="A New Way to Learn Space Science"
                    color="primary"
                    variant="outlined"
                    sx={{ width: 'fit-content', fontWeight: 600 }}
                  />
                  <Typography component="h1" variant="h2">
                    Discover the universe with OrionX
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    OrionX is a promotional platform built for curious minds to
                    understand outer space through immersive visuals, concise
                    concept modules, and community-led discussions full of
                    fascinating facts.
                  </Typography>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <Button
                      size="large"
                      variant="contained"
                      color="primary"
                      href="#concepts"
                    >
                      Explore Concepts
                    </Button>
                    <Button
                      size="large"
                      variant="outlined"
                      color="inherit"
                      href="#community"
                    >
                      Enter Discussions
                    </Button>
                  </Stack>
                </Stack>
              </Container>
            </Box>

            <Box
              id="experience"
              component="section"
              sx={{ pt: { xs: 1, md: 2 }, pb: { xs: 6, md: 10 } }}
            >
              <Container maxWidth="xl">
                <Typography component="h2" variant="h4" sx={{ mb: 2 }}>
                  Interactive Space Experience
                </Typography>
                <Typography
                  color="text.secondary"
                  sx={{ mb: 3, maxWidth: 760 }}
                >
                  Explore the scene directly in this large interaction zone.
                  Drag, rotate, and inspect to better understand visual space
                  concepts.
                </Typography>
                <Card
                  sx={{
                    border: '1px solid rgba(212, 175, 55, 0.4)',
                    background:
                      'radial-gradient(circle at top right, rgba(212, 175, 55, 0.2), rgba(42, 45, 51, 0.95) 65%)',
                    height: { xs: 420, sm: 520, md: 680 },
                  }}
                  aria-label="Large interactive OrionX universe animation"
                >
                  {!webglAvailable ? (
                    <Stack
                      spacing={2}
                      sx={{
                        height: { xs: 420, sm: 520, md: 680 },
                        alignItems: 'center',
                        justifyContent: 'center',
                        px: 3,
                        textAlign: 'center',
                        boxSizing: 'border-box',
                      }}
                    >
                      <Typography variant="h6">
                        Interactive 3D is unavailable on this browser
                      </Typography>
                      <Typography color="text.secondary" sx={{ maxWidth: 600 }}>
                        Your current environment has WebGL disabled or blocked,
                        so the Spline animation cannot run. You can still browse
                        the full OrionX website smoothly.
                      </Typography>
                    </Stack>
                  ) : !interactiveEnabled ? (
                    <Stack
                      spacing={2}
                      sx={{
                        height: { xs: 420, sm: 520, md: 680 },
                        alignItems: 'center',
                        justifyContent: 'center',
                        px: 3,
                        textAlign: 'center',
                        boxSizing: 'border-box',
                      }}
                    >
                      <Typography variant="h6">
                        Ready to explore in 3D?
                      </Typography>
                      <Typography color="text.secondary" sx={{ maxWidth: 520 }}>
                        Start the interactive scene when you are ready. This
                        keeps the page fast while still giving a full immersive
                        experience on demand.
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setInteractiveEnabled(true)}
                      >
                        Start Interactive Experience
                      </Button>
                    </Stack>
                  ) : (
                    <Box
                      sx={{
                        position: 'relative',
                        width: '100%',
                        height: { xs: 420, sm: 520, md: 680 },
                      }}
                    >
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => setInteractiveEnabled(false)}
                        aria-label="Close interactive animation"
                        sx={{
                          position: 'absolute',
                          top: 16,
                          right: 16,
                          zIndex: 2,
                        }}
                      >
                        Close Animation
                      </Button>
                      <Suspense
                        fallback={
                          <Box
                            sx={{
                              width: '100%',
                              height: { xs: 420, sm: 520, md: 680 },
                            }}
                          />
                        }
                      >
                        <SplineErrorBoundary>
                          <Spline
                            scene="https://prod.spline.design/fOTAcra3J1e7oPUb/scene.splinecode"
                            renderOnDemand
                          />
                        </SplineErrorBoundary>
                      </Suspense>
                    </Box>
                  )}
                </Card>
              </Container>
            </Box>

            <Box
              id="mission"
              component="section"
              sx={{ py: { xs: 6, md: 10 }, bgcolor: 'rgba(49, 52, 59, 0.72)' }}
            >
              <Container maxWidth="lg">
                <Stack spacing={2} sx={{ maxWidth: 760, mb: 4 }}>
                  <TypewriterText
                    text="Built for everyone curious about outer space"
                    variant="h3"
                    component="h2"
                    speed={50}
                  />
                  <TypewriterText
                    text="OrionX combines immersive interaction, trusted educational content, and social learning to make difficult concepts easy to approach at any skill level."
                    color="text.secondary"
                    speed={35}
                    startDelay={600}
                  />
                </Stack>
              </Container>
            </Box>

            <Box
              id="visuals"
              component="section"
              sx={{ py: { xs: 6, md: 10 } }}
            >
              <Container maxWidth="xl">
                <Stack spacing={3}>
                  <Typography component="h2" variant="h4">
                    Space Visual Gallery
                  </Typography>

                  <Card
                    sx={{
                      border: '1px solid rgba(212, 175, 55, 0.4)',
                      overflow: 'hidden',
                      position: 'relative',
                      minHeight: { xs: 320, md: 500 },
                    }}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        width: '100%',
                        height: { xs: 320, md: 500 },
                      }}
                    >
                      {prevVisualIndex !== null &&
                        prevVisualIndex !== activeVisualIndex && (
                          <Box
                            component="img"
                            src={spaceVisuals[prevVisualIndex].image}
                            aria-hidden="true"
                            onAnimationEnd={() => setPrevVisualIndex(null)}
                            sx={{
                              position: 'absolute',
                              inset: 0,
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              animation: 'fadeOut 0.8s ease forwards',
                              zIndex: 1,
                            }}
                          />
                        )}
                      <Box
                        component="img"
                        src={spaceVisuals[activeVisualIndex].image}
                        alt={spaceVisuals[activeVisualIndex].title}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                        }}
                      />
                      <IconButton
                        onClick={goToPrevVisual}
                        aria-label="Previous image"
                        sx={{
                          position: 'absolute',
                          left: 8,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          zIndex: 2,
                          color: '#fff',
                          bgcolor: 'rgba(0,0,0,0.35)',
                          backdropFilter: 'blur(4px)',
                          '&:hover': { bgcolor: 'rgba(0,0,0,0.55)' },
                        }}
                      >
                        <ChevronLeftIcon fontSize="large" />
                      </IconButton>
                      <IconButton
                        onClick={goToNextVisual}
                        aria-label="Next image"
                        sx={{
                          position: 'absolute',
                          right: 8,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          zIndex: 2,
                          color: '#fff',
                          bgcolor: 'rgba(0,0,0,0.35)',
                          backdropFilter: 'blur(4px)',
                          '&:hover': { bgcolor: 'rgba(0,0,0,0.55)' },
                        }}
                      >
                        <ChevronRightIcon fontSize="large" />
                      </IconButton>
                    </Box>
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        background:
                          'linear-gradient(180deg, rgba(18, 20, 24, 0.1) 40%, rgba(18, 20, 24, 0.75) 100%)',
                      }}
                    />
                    <Stack
                      sx={{
                        position: 'absolute',
                        left: 20,
                        right: 20,
                        bottom: 20,
                      }}
                      spacing={0.5}
                    >
                      <Typography variant="h5">
                        {spaceVisuals[activeVisualIndex].title}
                      </Typography>
                      <Typography color="text.secondary">
                        {spaceVisuals[activeVisualIndex].description}
                      </Typography>
                    </Stack>
                  </Card>

                  <Grid container spacing={2}>
                    {spaceVisuals.map((visual, index) => (
                      <Grid key={visual.title} size={{ xs: 12, sm: 6, md: 3 }}>
                        <Card
                          component="button"
                          onClick={() => {
                            setPrevVisualIndex(activeVisualIndex);
                            setActiveVisualIndex(index);
                          }}
                          sx={{
                            width: '100%',
                            border:
                              index === activeVisualIndex
                                ? '1px solid rgba(242, 210, 122, 0.8)'
                                : '1px solid rgba(212, 175, 55, 0.25)',
                            overflow: 'hidden',
                            textAlign: 'left',
                            bgcolor: 'background.paper',
                            p: 0,
                            cursor: 'pointer',
                            transition:
                              'transform 0.25s ease, border-color 0.25s ease',
                            '&:hover': {
                              transform: 'translateY(-6px)',
                              borderColor: 'secondary.main',
                            },
                          }}
                        >
                          <Box
                            component="img"
                            src={visual.image}
                            alt={visual.title}
                            sx={{
                              width: '100%',
                              height: 150,
                              objectFit: 'cover',
                              display: 'block',
                            }}
                          />
                          <CardContent>
                            <Typography variant="subtitle1">
                              {visual.title}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Stack>
              </Container>
            </Box>

            <Container
              id="concepts"
              maxWidth="lg"
              component="section"
              sx={{ py: { xs: 6, md: 10 } }}
            >
              <Typography component="h2" variant="h4" sx={{ mb: 4 }}>
                Core platform highlights
              </Typography>
              <Grid container spacing={3}>
                {features.map((feature, index) => (
                  <Grid key={feature.title} size={{ xs: 12, md: 4 }}>
                    <Card
                      className="jump-card"
                      sx={{
                        height: '100%',
                        border: '1px solid rgba(212, 175, 55, 0.25)',
                        animationDelay: `${0.15 * (index + 1)}s`,
                      }}
                    >
                      <CardContent>
                        <Stack spacing={2}>
                          {feature.icon}
                          <Typography component="h3" variant="h6">
                            {feature.title}
                          </Typography>
                          <Typography color="text.secondary">
                            {feature.description}
                          </Typography>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>

            <Box
              id="community"
              component="section"
              sx={{ py: { xs: 6, md: 10 }, bgcolor: 'rgba(37, 40, 46, 0.75)' }}
            >
              <Container maxWidth="lg">
                <Grid container spacing={4} sx={{ alignItems: 'center' }}>
                  <Grid size={{ xs: 12, md: 8 }}>
                    <Typography component="h2" variant="h4" sx={{ mb: 2 }}>
                      Discussion spaces that spark discovery
                    </Typography>
                    <Typography color="text.secondary">
                      OrionX discussion channels are designed for fact-sharing
                      and respectful debate around missions, cosmic events, and
                      emerging theories.
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Button
                      id="join"
                      fullWidth
                      size="large"
                      variant="contained"
                      color="secondary"
                    >
                      Join the OrionX Community
                    </Button>
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </>
        )}
      </Box>

      <Box
        component="footer"
        sx={{
          borderTop: '1px solid rgba(212, 175, 55, 0.2)',
          py: 4,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={2.5}>
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={2}
              sx={{ justifyContent: 'space-between' }}
            >
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5}>
                <Link
                  href="https://discord.gg/orionx"
                  target="_blank"
                  rel="noreferrer"
                  color="text.secondary"
                  underline="hover"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.75,
                  }}
                >
                  <DiscordIcon />
                  Discord
                </Link>
                <Link
                  href="https://instagram.com/orionx.space"
                  target="_blank"
                  rel="noreferrer"
                  color="text.secondary"
                  underline="hover"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.75,
                  }}
                >
                  <InstagramIcon fontSize="small" />
                  Instagram
                </Link>
              </Stack>
              <Link
                href="mailto:submissions@orionx.space?subject=Space%20Blog%20Submission%20for%20OrionX"
                color="primary.main"
                underline="hover"
                sx={{ fontWeight: 600, wordBreak: 'break-word' }}
              >
                Contact Us — Send Your Space Blog
              </Link>
            </Stack>
            <Typography color="text.secondary" variant="body2">
              Share original space blogs for possible publication on OrionX at{' '}
              <Link
                href="mailto:submissions@orionx.space"
                color="text.secondary"
                underline="always"
              >
                submissions@orionx.space
              </Link>
              .
            </Typography>
            <Typography color="text.secondary" variant="body2">
              © {new Date().getFullYear()} OrionX — Explore, Learn, Discuss.
            </Typography>
          </Stack>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
