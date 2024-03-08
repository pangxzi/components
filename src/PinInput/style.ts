import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ token, css }) => {
  const baseInput = css`
    padding: 0;
    text-align: center;
    &::placeholder {
      text-align: center;
    }
  `;
  return {
    input: css`
      ${baseInput};
      width: ${token.controlHeight}px;
      height: ${token.controlHeight}px;
    `,
    'input-small': css`
      ${baseInput};
      width: ${token.controlHeightSM}px;
      height: ${token.controlHeightSM}px;
    `,
    'input-large': css`
      ${baseInput};
      width: ${token.controlHeightLG}px;
      height: ${token.controlHeightLG}px;
    `,
    'input-warning': css`
      color: ${token.colorWarning};
      border-color: ${token.colorWarning};
      &::placeholder {
        color: ${token.colorWarning};
      }
    `,
    'input-error': css`
      color: ${token.colorError};
      border-color: ${token.colorError};
      &::placeholder {
        color: ${token.colorError};
      }
    `,
  };
});
