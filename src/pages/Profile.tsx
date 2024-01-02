import UserProfile from '../components/profile/UserProfile';
import withErrorBound from '../error-boundary/withErrorBound';

const Profile = () => withErrorBound(<UserProfile />);

export default Profile;
