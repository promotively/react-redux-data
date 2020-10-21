module.exports = {
  docdash: {
    typedefs: true
  },
  opts: {
    destination: 'dist/docs/',
    encoding: 'utf8',
    recurse: true,
    template: 'node_modules/docdash',
    verbose: true
  },
  plugins: ['plugins/markdown'],
  source: {
    include: ['src', './README.md']
  },
  tags: {
    allowUnknownTags: false
  },
  templates: {
    cleverLinks: false,
    default: {
      includeDate: false
    },
    monospaceLinks: false
  }
};
