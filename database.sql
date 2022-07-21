-- 1. Get all customers and their addresses.
select * from customers
join addresses on addresses.customer_id = customers.id;

--alias
--select table.column as "new_column_name" from table as 'variable'
select a.id as address_id from addresses as a
join customers on customers.id = a.customer_id;

-- 2. Get all orders and their line items (orders, quantity and product).
select * from orders
--join table on table.column = table.column
join line_items on line_items.order_id = orders.id;

-- 3. Which warehouses have cheetos?
select * from products
join warehouse_product on warehouse_product.product_id = products.id
join warehouse on warehouse.id = warehouse_product.warehouse_id
where description = 'cheetos';

-- 4. Which warehouses have diet pepsi?
select * from warehouse_product
join products on products.id = warehouse_product.product_id
join warehouse on warehouse.id = warehouse_product.warehouse_id
where products.description = 'diet pepsi';

-- 5. Get the number of orders for each customer. NOTE: It is OK if those without orders are not included in results.

--end result: orders, names
--what links them together?
select count(orders.address_id), first_name from customers
join addresses on addresses.customer_id = customers.id
join orders on orders.address_id = addresses.id
group by first_name;

-- 6. How many customers do we have?
select count(*) from customers;

-- 7. How many products do we carry?
select count(*) from products;

-- 8. What is the total available on-hand quantity of diet pepsi?
select sum(on_hand) from warehouse_product
where warehouse_product.product_id = 6;