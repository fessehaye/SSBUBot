import SmashController from '../smashController';

let slug = '';
let smashController = null;

describe('Testing Smash Controller', () => {
	beforeEach(() => {
		slug = 'for-glory-smush-vs-ultimate';
		smashController = new SmashController(slug);
	});

	test('Getting the controller defaults', () => {
		expect(smashController.slug).toEqual(slug);
		expect(smashController.client).not.toBeNull();
	});

	test('Changing the slug on the controller', () => {
		smashController.setSlug('shine-2018');
		expect(smashController.slug).toEqual('shine-2018');
	});

	test.todo('ParseInfo working correctly');
	test.todo('Give correct message when smash.gg query is empty');
});
