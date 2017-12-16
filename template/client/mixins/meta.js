const siteName = `Webpack Everything`

/**
 * Get meta from a vue instance
 * @param  {Object} vm  A vue instance (I think)
 * @return {[type]}     I'm not really sure
 */
function getMeta(vm) {
    const { meta } = vm.$options
    if (meta) {
        return typeof meta === 'function' ? meta.call(vm) : meta
    }
}

const serverMetaMixin = {
    created() {
        const meta = getMeta(this)
        if (meta) {
            let title = siteName

            if (meta.title) {
                if (meta.useWholeTitle) {
                    title = meta.title
                } else {
                    title = `${meta.title} | ${siteName}`
                }
            }

            this.$ssrContext.meta = {
                title,
                description: meta.description,
            }
        }
    },
}

const clientMetaMixin = {
    mounted() {
        const meta = getMeta(this)
        if (meta) {
            let title = siteName

            if (meta.title) {
                if (meta.useWholeTitle) {
                    title = meta.title
                } else {
                    title = `${meta.title} | ${siteName}`
                }
            }

            document.title = title
        }
    },
}

// `VUE_ENV` can be injected with `webpack.DefinePlugin`
export default process.env.VUE_ENV === 'server' ? 
    serverMetaMixin :
    clientMetaMixin
