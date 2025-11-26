# Learning-JavaScript


1. Downloading (what goes in ~/.npm):
npm fetches the package tarball (.tgz) from the registry
Stores it in ~/.npm as a compressed file
Example: react-18.2.0.tgz is just a compressed archive
Raw package file, not ready to use
2. Installing (what goes in node_modules):
Extracts the tarball
Places files in the correct location in node_modules
Resolves the dependency tree (installs sub-dependencies)
Links packages together (creates symlinks if needed)
Runs install scripts (like postinstall hooks)
Creates the final directory structure
Makes it importable via require('react')
