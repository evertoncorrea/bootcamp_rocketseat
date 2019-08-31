import Sequelize, { Model } from 'sequelize';

class Meetup extends Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.DATE,
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        location: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'organizer_id',
      as: 'organizer',
    });
    this.belongsTo(models.File, { foreignKey: 'banner_id', as: 'banner' });
    this.hasMany(models.Subscription, { foreignKey: 'meetup_id' });
  }
}

export default Meetup;
