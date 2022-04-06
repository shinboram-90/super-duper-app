import { useNavigate } from 'react-router-dom';
import rainyCloudLight from '../assets/rainyCloudLight.png';
import {
  EuiEmptyPrompt,
  EuiImage,
  EuiButton,
  EuiButtonEmpty,
} from '@elastic/eui';
// import { ThemeContext } from '../../../components/with_theme';

const Missing = () => {
  const navigate = useNavigate();
  // const themeContext = useContext(ThemeContext);
  // const isDarkTheme = themeContext.theme.includes('dark');

  return (
    <EuiEmptyPrompt
      color="subdued"
      icon={<EuiImage size="fullWidth" src={rainyCloudLight} alt="" />}
      title={<h2>Page not found</h2>}
      layout="vertical"
      body={
        <p>
          Sorry, we can&apos;t find the page you&apos;re looking for. It might
          have been removed or renamed, or maybe it never existed.
        </p>
      }
      actions={[
        <EuiButton href="/" color="primary" fill>
          Go home
        </EuiButton>,
        <EuiButtonEmpty
          onClick={() => navigate(-1)}
          iconType="arrowLeft"
          flush="both"
        >
          Go back
        </EuiButtonEmpty>,
      ]}
    />
  );
};
export default Missing;
