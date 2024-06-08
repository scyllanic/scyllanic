import { Model } from './decorators/model.decorator';
import { Property } from './decorators/property.decorator';
import { getModelDefinition, getPropsDefinition } from './metadata';
import { Repository } from './repository/repository';
import { Scyllanic } from './scyllanic';

import { ScyllanicConnection } from './scyllanic-connection';

@Model({ name: 'users' })
export class User {
  @Property({
    id: true,
    type: 'string',
  })
  id?: string;

  @Property()
  username!: string;
}

export class UserRepository extends Repository<User> {
  constructor(scyllanicConnection: ScyllanicConnection) {
    super(User, scyllanicConnection);
  }
}

async function main() {
  console.log('hello scyllanic');

  const scyllanicConnection = await Scyllanic.connect({
    contactPoints: ['127.0.0.1'],
    localDataCenter: 'datacenter1',
    keyspace: 'catalog',
  });

  const scyllanicConnection2 = Scyllanic.getConnection();

  const userRepository = scyllanicConnection.getRepository(User);
  const userRepository2 = new UserRepository(scyllanicConnection2);

  const users = await userRepository.find({
    where: { id: 'b153c371-0f03-11ef-99bb-5cffd29dd0b8' },
  });
  const users2 = await userRepository2.find({
    where: { id: 'b153c371-0f03-11ef-99bb-5cffd29dd0b8' },
  });
  const modelMeta = getModelDefinition(User);
  const propsMeta = getPropsDefinition(User);

  console.log(modelMeta);
  console.log(propsMeta);
  console.log(users);
  console.log(users2);

  await Scyllanic.disconnect();
}

main();
