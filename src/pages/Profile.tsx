import UserProfile from '../components/profile/UserProfile';
import useWithErrorBound from '../error-boundary/withErrorBound';

const Profile = () => useWithErrorBound(<UserProfile />);

export default Profile;
