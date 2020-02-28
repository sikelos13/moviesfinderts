import * as history from 'history';
// import { getBasenamePath } from './utils/getBasenamePath';

export default history.createBrowserHistory(
    {
        basename: "/"
    }
);