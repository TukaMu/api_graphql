export default (args) => {
    console.log({ args })
    return { token: "logado " + args.name }
};