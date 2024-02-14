import UserProfile from '../components/profile/UserProfile';
import ErrorBoundProvider from '../error-boundary/withErrorBound';

const Profile = () => (
  <ErrorBoundProvider>
    <UserProfile />
  </ErrorBoundProvider>
);

export default Profile;
