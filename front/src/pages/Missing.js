import { useNavigate } from 'react-router-dom';
import rainyCloudLight from '../assets/rainyCloudLight.png';
import { Link } from 'react-router-dom';

// import { ThemeContext } from '../../../components/with_theme';

const Missing = () => {
  const navigate = useNavigate();
  // const themeContext = useContext(ThemeContext);
  // const isDarkTheme = themeContext.theme.includes('dark');

  return (
    <>
      <h2>Page not found</h2>
      <p>
        Sorry, we can&apos;t find the page you&apos;re looking for. It might
        have been removed or renamed, or maybe it never existed.
      </p>
      <Link href="/" color="primary" fill>
        Go home
      </Link>
      <button onClick={() => navigate(-1)} iconType="arrowLeft" flush="both">
        Go back
      </button>
      ,
    </>
  );
};
export default Missing;
