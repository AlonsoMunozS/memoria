//import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primereact/resources/themes/tailwind-light/theme.css'
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';
import '../styles/DataTableDemo.css';
import '../styles/HomeBarResp.css';
import '../styles/DataTableResp.css';
import '../styles/Form.css';
import '../styles/LoginResp.css';
import '../styles/tenderInfo.css'

import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}