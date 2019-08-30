/* eslint-disable no-undef */
const ShoppingListService = require('../src/shopping-list-service')
const knex = require('knex')

describe(`Shopping List Service object`, function () {
  let db
  let testItems = [
    {
      shopping_item_id: 1,
      name: 'First test item!',
      date_added: new Date('2029-01-22T16:28:32.615Z'),
      price: '12.00',
      category: 'Main'
    },
    {
      shopping_item_id: 2,
      name: 'Second test item!',
      date_added: new Date('2100-05-22T16:28:32.615Z'),
      price: '21.00',
      category: 'Snack'
    },
    {
      shopping_item_id: 3,
      name: 'Third test item!',
      date_added: new Date('1919-12-22T16:28:32.615Z'),
      price: '3.00',
      category: 'Lunch'
    },
    {
      shopping_item_id: 4,
      name: 'Third test item!',
      date_added: new Date('1919-12-22T16:28:32.615Z'),
      price: '0.99',
      category: 'Breakfast'
    },
  ]

  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
  })

  before(() => db('shopping_list').truncate())

  afterEach(() => db('shopping_list').truncate())

  after(() => db.destroy())

  context(`Given 'shopping_list' has data`, () => {
    beforeEach(() => {
      return db
        .into('shopping_list')
        .insert(testItems)
    })

    it(`getAllItems() resolves all items from 'shopping_list' table`, () => {
      const expectedItems = testItems.map(item => ({
        ...item,
        checked: false,
      }))
      return ShoppingListService.getAllItems(db)
        .then(actual => {
          expect(actual).to.eql(expectedItems)
        })
    })

    it(`getByshopping_item_id() resolves an item by shopping_item_id from 'shopping_list' table`, () => {
      const shopping_item_idToGet = 3
      const thirdItem = testItems[shopping_item_idToGet - 1]
      return ShoppingListService.getByshopping_item_id(db, shopping_item_idToGet)
        .then(actual => {
          expect(actual).to.eql({
            shopping_item_id: shopping_item_idToGet,
            name: thirdItem.name,
            date_added: thirdItem.date_added,
            price: thirdItem.price,
            category: thirdItem.category,
            checked: false,
          })
        })
    })

    it(`deleteItem() removes an item by shopping_item_id from 'shopping_list' table`, () => {
      const itemshopping_item_id = 3
      return ShoppingListService.deleteItem(db, itemshopping_item_id)
        .then(() => ShoppingListService.getAllItems(db))
        .then(allItems => {
          // copy the test items array without the removed item
          const expected = testItems
            .filter(item => item.shopping_item_id !== itemshopping_item_id)
            .map(item => ({
              ...item,
              checked: false,
            }))
          expect(allItems).to.eql(expected)
        })
    })

    it(`updateItem() updates an item from the 'shopping_list' table`, () => {
      const shopping_item_idOfItemToUpdate = 3
      const newItemData = {
        name: 'updated title',
        price: '99.99',
        date_added: new Date(),
        checked: true,
      }
      const originalItem = testItems[shopping_item_idOfItemToUpdate - 1]
      return ShoppingListService.updateItem(db, shopping_item_idOfItemToUpdate, newItemData)
        .then(() => ShoppingListService.getByshopping_item_id(db, shopping_item_idOfItemToUpdate))
        .then(item => {
          expect(item).to.eql({
            shopping_item_id: shopping_item_idOfItemToUpdate,
            ...originalItem,
            ...newItemData,
          })
        })
    })
  })

  context(`Given 'shopping_list' has no data`, () => {
    it(`getAllItems() resolves an empty array`, () => {
      return ShoppingListService.getAllItems(db)
        .then(actual => {
          expect(actual).to.eql([])
        })
    })

    it(`insertItem() inserts an item and resolves the item with an 'shopping_item_id'`, () => {
      const newItem = {
        name: 'Test new name name',
        price: '5.05',
        date_added: new Date('2020-01-01T00:00:00.000Z'),
        checked: true,
        category: 'Lunch',
      }
      return ShoppingListService.insertItem(db, newItem)
        .then(actual => {
          expect(actual).to.eql({
            shopping_item_id: 1,
            name: newItem.name,
            price: newItem.price,
            date_added: newItem.date_added,
            checked: newItem.checked,
            category: newItem.category,
          })
        })
    })
  })
})