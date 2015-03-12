import Ember from 'ember';
import BMYAPIBoardFavDelRequest from '../../utils/BMYAPIBoardFavDelRequest';
import BMYAPIBoardFavAddRequest from '../../utils/BMYAPIBoardFavAddRequest';

export default Ember.ObjectController.extend({
	boardName: '',
	actions: {
		addBoard: function() {
			var self = this;
			var board = this.get('boardName');
			var bfar = new BMYAPIBoardFavAddRequest({ "board": board });
			bfar.pull().then(function(data) {
				if (data.errcode === 0) {
					self.model.board_array.addObject({
						"name": data.board,
						"secstr": data.secstr,
						"accessible": 1
					});

					var new_num = self.model.board_num + 1;
					self.set('board_num', new_num);
					self.set('boardName', '');
				} else if (data.errcode === 100009) {
					alert('已达到最大记录数，无法添加。');
				} else if (data.errcode === 100010) {
					alert('记录已存在，不用再添加啦！');
				} else if (data.errcode === 110000 || data.errcode === 100004) {
					alert('没有找到相关版面...您再瞅瞅？');
				} else {
					alert('系统出错啦 :(');
				}
			});
		},
		delBoard: function(board) {
			var self = this;
			var bfdr = new BMYAPIBoardFavDelRequest({ "board": board });
			bfdr.pull().then(function(data) {
				if(data.errcode === 0) {
					for (var i=0; i<self.model.board_num; ++i) {
						if (self.model.board_array[i].name === board) {
							self.model.board_array.removeObject(self.model.board_array[i]);

							var new_num = self.model.board_num - 1;
							self.set('board_num', new_num);
							return ;
						}
					}
				} else if(data.errcode === 100011) {
					alert('记录不存在，无法删除哦~');
				} else {
					alert('系统出错啦 :(');
				}
			});
		}
	}
});
