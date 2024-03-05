import { createStyles } from '../theme';

export const useStyle = createStyles(({ token, css, cx, prefixCls }) => {
  const prefix = `${prefixCls}-float-panel`;
  const commonHandle = css`
    position: relative;
    &::before {
      position: absolute;
      z-index: 50;
      transition: all 0.3s ease-in-out;
      content: '';
    }

    &:hover,
    &:active {
      &::before {
        background: ${token.colorPrimary};
      }
    }
  `;

  return {
    float: cx(
      `${prefix}-float`,
      css`
        overflow: hidden;
        border-radius: 8px;
        background: ${token.colorBgElevated};
        box-shadow: ${token.boxShadowSecondary};
        z-index: 2000;
      `,
    ),
    leftHandle: cx(
      css`
        ${commonHandle};

        &::before {
          left: 50%;
          width: 2px;
          height: 100%;
        }
      `,
      `${prefix}-left-handle`,
    ),
    rightHandle: cx(
      css`
        ${commonHandle};
        &::before {
          right: 50%;
          width: 2px;
          height: 100%;
        }
      `,
      `${prefix}-right-handle`,
    ),
    topHandle: cx(
      `${prefix}-top-handle`,
      css`
        ${commonHandle};

        &::before {
          top: 50%;
          height: 2px;
          width: 100%;
        }
      `,
    ),
    bottomHandle: cx(
      `${prefix}-bottom-handle`,
      css`
        ${commonHandle};

        &::before {
          bottom: 50%;
          height: 2px;
          width: 100%;
        }
      `,
    ),
  };
});
