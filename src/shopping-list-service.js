const ShoppingListService = {
    getAllItems(knex) {
        return knex.select('*').from('shopping_list')
    },
    insertItem(knex, newItem) {
        return knex
            .insert(newItem)
            .into('shopping_list')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    getByshopping_item_id(knex, shopping_item_id) {
        return knex.from('shopping_list').select('*').where('shopping_item_id', shopping_item_id).first()
    },
    deleteItem(knex, shopping_item_id) {
        return knex('shopping_list')
            .where({ shopping_item_id })
            .delete()
    },
    updateItem(knex, shopping_item_id, newItemFields) {
        return knex('shopping_list')
            .where({ shopping_item_id })
            .update(newItemFields)
    },
}


module.exports = ShoppingListService;
