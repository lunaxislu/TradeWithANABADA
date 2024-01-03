import Registration from '../components/post/Registration';
import useWithErrorBound from '../error-boundary/withErrorBound';

const Post = () => useWithErrorBound(<Registration />);

export default Post;
