class apiFilters {
    
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }


    filter() {
        const queryObj = { ...this.queryString };
        const excludedFields = ["sort", "page", "limit"];
        f.forEach((el) => {
            delete queryObj[el];
        })
        let query = Product.find(queryObj);
        return this;
    }

    sort() {
        if(req.query.sort) {
            const sortBy = req.query.sort;
            query = this.query.sort(sortBy)
        }
        return this;
    }

    fields() {
        if(req.query.fields) {
            const selectBy = req.query.fields.split(",").join(" ");
            query = this.query.select(selectBy);
        }
        return this;
    }

    pagination
    () {
        const page = +req.query.page || 1;
        const limit = +req.query.limit || 10;
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);
    }
}