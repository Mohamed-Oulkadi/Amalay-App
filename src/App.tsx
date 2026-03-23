import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BottomNav } from "@/shared/components/layout/BottomNav";
import { Navbar } from "@/shared/components/layout/Navbar";
import { AzulChatbot } from "@/shared/components/chat/AzulChatbot";
import LandingPage from "@/modules/explore/pages/LandingPage";
import ExplorePage from "@/modules/explore/pages/ExplorePage";
import PlaceDetailPage from "@/modules/explore/pages/PlaceDetailPage";
import OnboardingPage from "@/modules/onboarding/pages/OnboardingPage";
import RecommendationPage from "@/modules/recommendation/pages/RecommendationPage";
import LoginPage from "@/modules/auth/pages/LoginPage";
import RegisterPage from "@/modules/auth/pages/RegisterPage";
import GuideRegisterPage from "@/modules/auth/pages/GuideRegisterPage";
import GuideDashboardPage from "@/modules/guide/pages/GuideDashboardPage";
import GuideDetailPage from "@/modules/guide/pages/GuideDetailPage";
import CommunityFeedPage from "@/modules/community/pages/CommunityFeedPage";
import BookingPage from "@/modules/booking/pages/BookingPage";
import BookingsPage from "@/modules/booking/pages/BookingsPage";
import ProfilePage from "@/modules/profile/pages/ProfilePage";
import EventsPage from "@/modules/events/pages/EventsPage";
import EventDetailPage from "@/modules/events/pages/EventDetailPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/place/:id" element={<PlaceDetailPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/recommendations" element={<RecommendationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/guide/register" element={<GuideRegisterPage />} />
          <Route path="/guide/dashboard" element={<GuideDashboardPage />} />
          <Route path="/guide/:id" element={<GuideDetailPage />} />
          <Route path="/community" element={<CommunityFeedPage />} />
          <Route path="/booking/:id" element={<BookingPage />} />
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/guide/profile" element={<ProfilePage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:id" element={<EventDetailPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <AzulChatbot />
        <BottomNav />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
