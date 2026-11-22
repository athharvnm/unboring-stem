module.exports = {
  content: ['./index.html', './src/**/*.jsx'],
  theme: { extend: {
    fontFamily: {
      serif: ['Newsreader', 'Georgia', 'Cambria', 'serif'],
      sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    colors: { paper: '#FAF8F5', surface: '#FFFFFF', ink: '#161A22', muted: '#525B6E', line: '#E4E0D8',
      cobalt: '#1D4ED8', tealbond: '#0F766E', amberbond: '#B45309', rosebond: '#BE123C' },
  } },
};
