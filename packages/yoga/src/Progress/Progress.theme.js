const Progress = ({ spacing, colors, radii, fontSizes }) => ({
  height: spacing.xxsmall,
  backgroundColor: {
    bar: colors.gray[1],
  },
  border: {
    radius: radii.rounded,
  },
  label: {
    font: {
      size: fontSizes.xsmall,
    },
  },
});

export default Progress;
