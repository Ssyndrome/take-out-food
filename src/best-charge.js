'use strict;'
function loadPromotions() {
  return [{
    type: '满30减6元'
  }, {
    type: '指定菜品半价(黄焖鸡，凉皮)',
    items: ['ITEM0001', 'ITEM0022']
  }];
};

function loadAllItems() {
  return [{
    id: 'ITEM0001',
    name: '黄焖鸡',
    price: 18.00
  }, {
    id: 'ITEM0013',
    name: '肉夹馍',
    price: 6.00
  }, {
    id: 'ITEM0022',
    name: '凉皮',
    price: 8.00
  }, {
    id: 'ITEM0030',
    name: '冰锋',
    price: 2.00
  }];
};

function bestCharge(inputs) {
	var food_list = get_food_list(inputs);
	var discount = get_discount_compared(food_list);
	var print_list = get_print_list(food_list,discount);
	return print_list;
}

function get_food_list(inputs){
	let id_list = {};
	inputs.forEach(function(input){
		id_list[input.split(' x')[0]] = parseInt(input.split('x')[1]);
	});
	
	let items = loadAllItems();
	let food_list = [];
	items.forEach(function(val,index){
		if(id_list[val.id]){
			val.count = id_list[val.id];
			
			food_list.push(val);
		}
	});
	return food_list;
}

function get_discount_1(food_list){
	let sum_1 = 0;
	let discount_1 = [];
	discount_1.type = loadPromotions()[0].type;
	food_list.forEach(function(food){
		sum_1 += food.price*food.count;
	});
	sum_1 > 30?discount_1.count = parseInt(sum_1/30) * 6:discount_1.count = 0;
	return discount_1;
}

function get_discount_2(food_list){
	let promotion_2 = loadPromotions()[1].items;
	let discount_2 = [];
	discount_2.type = loadPromotions()[1].type;
	discount_2.count = 0;
	food_list.forEach(function(food){
		promotion_2.forEach(function(id){
			if(id === food.id){
				discount_2.count += (food.price/2)*food.count;
			}
		});
	});
	return discount_2;
}

function get_discount_compared(food_list){
	let discount = [];
	let discount_1 = get_discount_1(food_list);
	let discount_2 = get_discount_2(food_list);
	discount_1.count >= discount_2.count?discount = discount_1:discount = discount_2;
	return discount;
}

function get_print_list(food_list,discount){
	let print_list = "============= 订餐明细 =============";
	let sum = 0;
	food_list.forEach(function(food){
		print_list += '\n'+food.name+ " x " +food.count+ " = " +food.price*food.count+"元";
		sum += food.price*food.count;
	});
	if(discount.count !== 0){
			print_list += '\n'+"-----------------------------------"+'\n'+"使用优惠:"+'\n'+discount.type+ "，省" +discount.count+"元";
	}
	print_list += '\n'+"-----------------------------------"+'\n'+"总计："+(sum-discount.count)+"元"+'\n'+"==================================="
	return print_list;
}

console.log(bestCharge(["ITEM0013 x 4"]));