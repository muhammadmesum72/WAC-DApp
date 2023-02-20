import { IconButton, Tooltip } from '@mui/material';
import useClipboard from 'react-use-clipboard';

import SvgIconStyle from './SvgIconStyle';

export default function ClipText({ address, src, sx }) {
    const [isCopied, setCopied] = useClipboard(address);

    return (
        <Tooltip title={`${isCopied ? 'Copied' : 'copy'}`}>
            <IconButton
                onClick={setCopied}
                sx={{
                    p: 0,
                }}
            >
                <SvgIconStyle
                    src={src || '/img/svg/copy.svg'}
                    sx={{
                        ...sx,
                    }}
                />
            </IconButton>
        </Tooltip>
    );
}
