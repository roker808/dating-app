import { delayMs } from "../core/utils";
import { authService } from "./AuthService";
import { IProfile } from "./Profile";


const profilesAll: IProfile[] = [
  {
    id: '1',
    name: 'Alex Marinovsky',
    age: 31,
    thumbnailUri: 'https://www.capitalfm.co.ke/lifestyle/files/2015/01/proud.jpg',
    about: 'Mauris luctus dui tellus, nec dignissim est placerat sed. Fusce felis erat, luctus vel velit non, bibendum egestas purus. In pretium augue eu ante rhoncus viverra. Nam sollicitudin quam in urna egestas eleifend. Ut mollis neque vel imperdiet congue. Nullam egestas augue justo. Nam et purus tristique, commodo nisi non, placerat nulla. Vivamus rhoncus orci libero, eget eleifend nibh dignissim vitae. Nullam dui risus, convallis eget nibh et, volutpat viverra elit. Sed facilisis accumsan lacus, ac blandit tellus porttitor quis. Sed consectetur augue eget urna scelerisque faucibus. Maecenas volutpat lorem vel ex pharetra aliquam.'
  },
  {
    id: '2',
    name: 'Katrin Plyakova',
    age: 38,
    thumbnailUri: 'https://pbs.twimg.com/profile_images/1465102977312636929/oXKdq9aL_400x400.jpg',
    about: 'Ut convallis sapien ac sem suscipit ultricies. Praesent nec blandit tortor. Donec laoreet at quam vitae tincidunt. Ut vel ultricies urna. Nunc posuere nunc non facilisis efficitur. Cras scelerisque tempus sapien eget fermentum. Nam pellentesque enim consequat volutpat sollicitudin. Maecenas sollicitudin elementum magna. Donec facilisis eros a urna aliquam placerat. Suspendisse posuere at nibh nec commodo. Proin sed egestas dolor. Fusce mi dolor, consectetur nec blandit sed, convallis vitae nisl. Morbi vulputate tristique purus et feugiat.'
  },
  {
    id: '3',
    name: 'Pavel Volya',
    age: 43,
    thumbnailUri: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Photo_portrait_PP.jpg',
    about: 'Morbi tortor leo, viverra varius sollicitudin eget, molestie ut orci. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque non posuere purus, ut lacinia metus. Donec volutpat massa id lacinia rhoncus. Suspendisse ut nunc ac mi tristique sagittis nec ac mauris. Aliquam lobortis vestibulum purus a eleifend. Quisque ut molestie magna. Pellentesque vel massa leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nec gravida nunc. Duis in nisi ligula. Sed quis elementum odio. Sed sed neque blandit, euismod turpis at, efficitur ligula. Nunc pretium leo dui, ac ullamcorper ipsum maximus non. Quisque convallis cursus accumsan. Vivamus non porta sem.'
  },
  {
    id: '4',
    name: 'Dmitry Robinson',
    age: 51,
    thumbnailUri: 'https://i.guim.co.uk/img/media/5b83709595a049beaec7c1cb99395afce64be884/0_221_5184_3110/master/5184.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=40b5a7db5183fd3a63807582a29f971b',
    about: 'Mauris malesuada condimentum augue sit amet tempor. Donec dictum libero vel dictum accumsan. Donec et ante sodales, gravida metus finibus, cursus quam. Integer sit amet tellus pretium, lobortis risus sed, lacinia mi. Aliquam pellentesque convallis est, fermentum sagittis mauris sodales et. Phasellus sollicitudin leo et mauris venenatis, eget rhoncus lorem fringilla. Nunc eget arcu vel enim blandit cursus ut vitae justo. Suspendisse potenti.'
  },
  {
    id: '5',
    name: 'Maria Kuchova',
    age: 42,
    thumbnailUri: 'https://pyxis.nymag.com/v1/imgs/681/d28/000919a11ecbabb193485f14279979376a-02-female-ceo.rsquare.w700.jpg',
    about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi auctor massa a purus imperdiet porta. Pellentesque eu pellentesque elit, ut imperdiet eros. Donec a pharetra dolor. Nulla finibus nibh congue nisi mattis, ut suscipit purus tincidunt. Aliquam cursus diam eget fermentum rutrum. Aenean mi mauris, tristique sed ex maximus, posuere vestibulum libero. Donec id dictum dui. Suspendisse sodales ex velit, at imperdiet nulla porta non. Sed feugiat nibh et lacus interdum pretium. Nulla facilisi.'
  }
];

class ProfilesService {
  find(id: string) {
    return delayMs(1000, profilesAll.find(x => x.id === id));
  }

  get() {
    const currentProfileId = authService.getData()?.profileId;
    const profiles = profilesAll.filter(x => x.id !== currentProfileId)
      .map(profile => ({ profile, random: Math.random() }))
      .sort((f, s) => f.random - s.random)
      .map(({ profile }) => profile);

    return delayMs(1000, profiles);
  }
}

export const profilesService = new ProfilesService();