import { FieldResolver } from "nexus";

const getLinks: FieldResolver<"User", "links"> = (
	{ id },
	_args,
	{ prisma }
) => {
	return prisma.link.findMany({
		where: {
			postedById: id,
		},
	});
};

export default getLinks;
