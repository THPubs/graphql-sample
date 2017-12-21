import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";

const userSchema = new mongoose.Schema();
userSchema.plugin(mongoosePaginate);

const User = mongoose.model("User", userSchema, "users");

export default {
  Query: {
    users: (root, { page, limit, firstName, lastName }) =>
      new Promise((resolve, reject) => {
        const query = {};
        const options = {
          sort: { firstName: 1 },
          lean: true,
          page,
          limit
        };

        if (firstName) {
          query.firstName = new RegExp(firstName, "i");
        }

        if (lastName) {
          query.lastName = new RegExp(lastName, "i");
        }

        User.paginate(query, options)
          .then(async result => {
            const { docs, total, pages } = result;

            resolve({
              edges: docs,
              pageInfo: {
                total,
                page: result.page,
                pages
              }
            });
          })
          .catch(error => {
            reject(error);
          });
      }),
    user: (root, { _id }) =>
      new Promise((resolve, reject) => {
        User.findOne({ _id })
          .lean()
          .exec(async (error, docs) => {
            if (error) {
              reject(error);
            }

            resolve({
              firstName: docs.firstName,
              lastName: docs.lastName,
              email: docs.email,
              companyData: docs.companyData
            });
          });
      })
  }
};
