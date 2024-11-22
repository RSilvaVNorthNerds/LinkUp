const mutationResolvers = {
  Mutation: {
    createHello: (args: { name: string }) => {
      return `Hello, ${args.name}`;
    },
  },
};

export default mutationResolvers;
