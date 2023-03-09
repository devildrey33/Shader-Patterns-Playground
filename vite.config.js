//import glsl from 'vite-plugin-glsl'
import vitePluginString from 'vite-plugin-string'

const isCodeSandbox = 'SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env

export default {
    root: 'src/',
    publicDir: '../static/',
    base: './',
    server:
    {
        host: true,
        open: !isCodeSandbox // Open if it's not a CodeSandbox
    },
    build:
    {
        outDir: '../dist',
        emptyOutDir: true,
        sourcemap: true
    },
    plugins:
    [
        vitePluginString({ compress : false })
/*        glsl({
            includeComments : true // incluir comentarios
        })*/
    ]
}

