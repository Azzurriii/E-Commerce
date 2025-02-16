import _ from 'lodash';

export const getInfoData = ({ fields = [], object = {} }: { fields: Array<any>; object: any }) => {
	return _.pick(object, fields);
};

export default {
	getInfoData,
};
