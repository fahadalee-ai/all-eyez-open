import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const root = join(process.cwd(), "src", "routes");

const simple = [
  ["index.tsx", "/", "SplashScreen", "@/screens/auth"],
  ["onboarding.tsx", "/onboarding", "OnboardingScreen", "@/screens/auth"],
  ["safety-tips.tsx", "/safety-tips", "SafetyTipsScreen", "@/screens/auth"],
  ["welcome.tsx", "/welcome", "WelcomeScreen", "@/screens/auth"],
  ["login.tsx", "/login", "LoginScreen", "@/screens/auth"],
  ["register.tsx", "/register", "RegisterScreen", "@/screens/auth"],
  ["verify.tsx", "/verify", "OtpScreen", "@/screens/auth"],
  ["forgot.tsx", "/forgot", "ForgotScreen", "@/screens/auth"],
  ["reset.tsx", "/reset", "ResetScreen", "@/screens/auth"],
  ["setup-safety.tsx", "/setup-safety", "SetupSafetyScreen", "@/screens/auth"],
  ["home.tsx", "/home", "HomeScreen", "@/screens/home"],
  ["services/index.tsx", "/services/", "ServicesScreen", "@/screens/services"],
  ["consult/index.tsx", "/consult/", "ConsultTypeScreen", "@/screens/consult"],
  ["consult/mode.tsx", "/consult/mode", "ConsultModeScreen", "@/screens/consult"],
  ["consult/specialist.tsx", "/consult/specialist", "ConsultSpecialistScreen", "@/screens/consult"],
  ["consult/when.tsx", "/consult/when", "ConsultWhenScreen", "@/screens/consult"],
  ["consult/details.tsx", "/consult/details", "ConsultDetailsScreen", "@/screens/consult"],
  ["consult/review.tsx", "/consult/review", "ConsultReviewScreen", "@/screens/consult"],
  ["consult/done.tsx", "/consult/done", "ConsultDoneScreen", "@/screens/consult"],
  ["consultations/index.tsx", "/consultations/", "ConsultationsScreen", "@/screens/consult"],
  ["donate/index.tsx", "/donate/", "DonateScreen", "@/screens/donate"],
  ["donate/details.tsx", "/donate/details", "DonorDetailsScreen", "@/screens/donate"],
  ["donate/pay.tsx", "/donate/pay", "DonatePayScreen", "@/screens/donate"],
  ["donate/review.tsx", "/donate/review", "DonateReviewScreen", "@/screens/donate"],
  ["donate/thanks.tsx", "/donate/thanks", "DonateThanksScreen", "@/screens/donate"],
  ["donations.tsx", "/donations", "DonationsScreen", "@/screens/donate"],
  ["supporters.tsx", "/supporters", "SupportersScreen", "@/screens/donate"],
  ["volunteer.tsx", "/volunteer", "VolunteerScreen", "@/screens/donate"],
  ["sponsor.tsx", "/sponsor", "SponsorScreen", "@/screens/donate"],
  ["community/index.tsx", "/community/", "CommunityScreen", "@/screens/community"],
  ["community/new.tsx", "/community/new", "CreatePostScreen", "@/screens/community"],
  ["guidelines.tsx", "/guidelines", "GuidelinesScreen", "@/screens/community"],
  ["professional.tsx", "/professional", "ProfessionalScreen", "@/screens/community"],
  ["qa/index.tsx", "/qa/", "QaScreen", "@/screens/account"],
  ["qa/ask.tsx", "/qa/ask", "AskQuestionScreen", "@/screens/account"],
  ["qa/mine.tsx", "/qa/mine", "MyQuestionsScreen", "@/screens/account"],
  ["gallery/index.tsx", "/gallery/", "GalleryScreen", "@/screens/account"],
  ["programs/index.tsx", "/programs/", "ProgramsScreen", "@/screens/shop"],
  ["shop/index.tsx", "/shop/", "ShopScreen", "@/screens/shop"],
  ["cart.tsx", "/cart", "CartScreen", "@/screens/shop"],
  ["checkout.tsx", "/checkout", "CheckoutScreen", "@/screens/shop"],
  ["orders/index.tsx", "/orders/", "OrdersScreen", "@/screens/shop"],
  ["chat/index.tsx", "/chat/", "ChatListScreen", "@/screens/chat"],
  ["contact/index.tsx", "/contact/", "ContactScreen", "@/screens/account"],
  ["contact/sent.tsx", "/contact/sent", "ContactSentScreen", "@/screens/account"],
  ["queries.tsx", "/queries", "QueriesScreen", "@/screens/account"],
  ["reviews.tsx", "/reviews", "ReviewsScreen", "@/screens/account"],
  ["profile/index.tsx", "/profile/", "ProfileScreen", "@/screens/account"],
  ["profile/edit.tsx", "/profile/edit", "EditProfileScreen", "@/screens/account"],
  ["saved.tsx", "/saved", "SavedScreen", "@/screens/account"],
  ["my-posts.tsx", "/my-posts", "MyPostsScreen", "@/screens/account"],
  ["settings/index.tsx", "/settings/", "SettingsScreen", "@/screens/account"],
  ["settings/notifications.tsx", "/settings/notifications", "NotificationSettingsScreen", "@/screens/account"],
  ["settings/privacy.tsx", "/settings/privacy", "PrivacySettingsScreen", "@/screens/account"],
  ["settings/appearance.tsx", "/settings/appearance", "AppearanceScreen", "@/screens/account"],
  ["settings/accessibility.tsx", "/settings/accessibility", "AccessibilityScreen", "@/screens/account"],
  ["notifications.tsx", "/notifications", "NotificationsScreen", "@/screens/account"],
  ["help.tsx", "/help", "HelpScreen", "@/screens/account"],
  ["shelters.tsx", "/shelters", "SheltersScreen", "@/screens/account"],
  ["safety-plan.tsx", "/safety-plan", "SafetyPlanScreen", "@/screens/account"],
  ["about.tsx", "/about", "AboutScreen", "@/screens/account"],
  ["impact.tsx", "/impact", "ImpactScreen", "@/screens/account"],
  ["team.tsx", "/team", "TeamScreen", "@/screens/account"],
  ["careers.tsx", "/careers", "CareersScreen", "@/screens/account"],
  ["privacy.tsx", "/privacy", "PrivacyScreen", "@/screens/account"],
  ["terms.tsx", "/terms", "TermsScreen", "@/screens/account"],
  ["confidentiality.tsx", "/confidentiality", "ConfidentialityScreen", "@/screens/account"],
  ["social.tsx", "/social", "SocialScreen", "@/screens/account"],
  ["more.tsx", "/more", "MoreScreen", "@/screens/account"],
  ["index-map.tsx", "/index-map", "SitemapScreen", "@/screens/account"],
];

const params = [
  ["services/$id.tsx", "/services/$id", "ServiceDetailScreen", "@/screens/services", "id"],
  ["consultations/$id.tsx", "/consultations/$id", "ConsultationDetailScreen", "@/screens/consult", "id"],
  ["call/$id.tsx", "/call/$id", "CallScreen", "@/screens/consult", "id"],
  ["rate/$id.tsx", "/rate/$id", "RateScreen", "@/screens/consult", "id"],
  ["donate/recurring/$id.tsx", "/donate/recurring/$id", "RecurringScreen", "@/screens/donate", "id"],
  ["community/$id.tsx", "/community/$id", "PostDetailScreen", "@/screens/community", "id"],
  ["lawyers/$id.tsx", "/lawyers/$id", "LawyerScreen", "@/screens/community", "id"],
  ["questions/$id.tsx", "/questions/$id", "QuestionDetailScreen", "@/screens/account", "id"],
  ["gallery/$album.tsx", "/gallery/$album", "AlbumScreen", "@/screens/account", "album"],
  ["photos/$id.tsx", "/photos/$id", "PhotoScreen", "@/screens/account", "id"],
  ["programs/$id/index.tsx", "/programs/$id/", "ProgramDetailScreen", "@/screens/shop", "id"],
  ["programs/$id/register.tsx", "/programs/$id/register", "ProgramRegisterScreen", "@/screens/shop", "id"],
  ["ticket/$id.tsx", "/ticket/$id", "TicketScreen", "@/screens/shop", "id"],
  ["shop/$id.tsx", "/shop/$id", "ProductScreen", "@/screens/shop", "id"],
  ["order-confirmed/$id.tsx", "/order-confirmed/$id", "OrderConfirmedScreen", "@/screens/shop", "id"],
  ["orders/$id/index.tsx", "/orders/$id/", "OrderDetailScreen", "@/screens/shop", "id"],
  ["orders/$id/return.tsx", "/orders/$id/return", "ReturnScreen", "@/screens/shop", "id"],
  ["chat/$id.tsx", "/chat/$id", "ChatThreadScreen", "@/screens/chat", "id"],
];

function simpleFile(path, name, from) {
  return `import { createFileRoute } from "@tanstack/react-router";
import { ${name} } from "${from}";

export const Route = createFileRoute("${path}")({
  component: ${name},
});
`;
}

function paramFile(path, name, from, param) {
  const fn = `${name}Route`;
  return `import { createFileRoute } from "@tanstack/react-router";
import { ${name} } from "${from}";

export const Route = createFileRoute("${path}")({
  component: ${fn},
});

function ${fn}() {
  const { ${param} } = Route.useParams();
  return <${name} ${param}={${param}} />;
}
`;
}

for (const [file, path, name, from] of simple) {
  const dest = join(root, file);
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, simpleFile(path, name, from));
}

for (const [file, path, name, from, param] of params) {
  const dest = join(root, file);
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, paramFile(path, name, from, param));
}

console.log(`wrote ${simple.length + params.length} routes`);
