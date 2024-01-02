import Registration from '../components/post/Registration';
import withErrorBound from '../error-boundary/withErrorBound';

const Post = () => withErrorBound(<Registration />);

export default Post;
