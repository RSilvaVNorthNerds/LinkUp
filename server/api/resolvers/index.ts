import queryResolvers from "./queries";
import mutationResolvers from "./mutations";

const resolvers = { ...queryResolvers, ...mutationResolvers };

export default resolvers;
