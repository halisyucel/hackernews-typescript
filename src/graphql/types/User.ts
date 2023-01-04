import getLinks from "../resolvers/getLinks";
import { objectType } from "nexus";

export const User = objectType({
	name: "User",
	definition(t) {
		t.nonNull.id("id");
		t.nonNull.string("name");
		t.nonNull.string("email");
		t.nonNull.string("password");
		t.nonNull.list.nonNull.field("links", {
			type: "Link",
			resolve: getLinks,
		});
	},
});
