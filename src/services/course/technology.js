//jshint esversion:11

import Tech from "../../models/technology.js";

class Technology {
  createTechnology(title) {
    return new Promise(async (resolve, reject) => {
      try {
        if (typeof title === "string") {
          const newTechnology = new Tech({
            title,
          });

          await newTechnology
            .save()
            .then((result) => resolve(result))
            .catch((err) => reject(err.message));
        } else {
          reject(`Invalid title - ${title}`);
        }
      } catch (e) {
        reject(e.message);
      }
    });
  }

  editTechnology(id, title) {
    return new Promise(async (resolve, reject) => {
      try {
        let filter = { _id: id },
          update = { title, updatedAt: Date.now() };
        await Tech.findOneAndUpdate(filter, update, { new: true })
          .then((result) => resolve(result))
          .catch((err) => reject(err.message));
      } catch (e) {
        reject(e.message);
      }
    });
  }

  getTechnology() {
    return new Promise(async (resolve, reject) => {
      try {
        let technologies = await Tech.find(
          { status: true },
          { _id: 1, title: 1 }
        ).exec();

        if (technologies) resolve(technologies);
      } catch (e) {
        reject(e.message);
      }
    });
  }

  deleteTechnology(_id) {
    return new Promise(async (resolve, reject) => {
      try {
        let deletedResult = await Tech.deleteOne({ _id }).exec();
        if (deletedResult) {
          resolve(deletedResult);
        } else {
          reject(deletedResult);
        }
      } catch (e) {
        reject(e.message);
      }
    });
  }
}

export default Technology;
