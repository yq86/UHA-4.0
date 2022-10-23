"use strict";

require('../../config/db');

require('dotenv').config();

var _require = require("../../models"),
    Users = _require.Users;

var _require2 = require("../../models"),
    Holidays = _require2.Holidays;

var _require3 = require("../../models"),
    Demandes = _require3.Demandes;

var _require4 = require("../../models"),
    Types = _require4.Types;

var _require5 = require("../../models"),
    Statuses = _require5.Statuses;

var express = require('express');

var jwt = require('jsonwebtoken');

var app = express();
var refreshTokens = []; // to create users

exports.createUser = function _callee(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          user = req.body;
          _context.next = 4;
          return regeneratorRuntime.awrap(Users.create(user).then(function (createdUser) {
            res.json(createdUser); // return created user

            var idUser = createdUser.id;
            var role = createdUser.role;
            var startingDate = createdUser.firstWorkingDay;

            if (role == 2 || role == 3) {
              // si user n'est pas admin, create holiday
              // to get the date of 6 months after first working date
              var dateWorked6months = new Date(new Date(startingDate).setMonth(new Date(startingDate).getMonth() + 6));
              var totalConge;

              if (new Date() >= dateWorked6months) {
                // if this employee has been working for more than 6 months
                // to calculate days of congés payés
                totalConge = calculateCongesPayes(startingDate);
              } else {
                // if this employee has not been working for more than 6 months
                totalConge = 0; // no congés payés normale available
              }

              var holiday = {
                "UserId": [idUser],
                "holidaysAvailable": totalConge,
                "holidaysTaken": 0
              };
              Holidays.create(holiday); //to create this employee's paid leaves
            }
          }));

        case 4:
          _context.next = 9;
          break;

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          res.send(_context.t0);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 6]]);
}; // to get all the users


exports.getAll = function _callee2(req, res) {
  var users;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Users.findAll({
            include: [Demandes, Holidays]
          }));

        case 3:
          users = _context2.sent;
          res.json(users); // to return the list of users

          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.send(_context2.t0);

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; // to get user by id


exports.getUserById = function _callee3(req, res) {
  var id, user;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          id = req.params.id;
          _context3.next = 4;
          return regeneratorRuntime.awrap(Users.findByPk(id, {
            include: [{
              model: Demandes,
              include: [Types, Statuses]
            }, Holidays]
          }));

        case 4:
          user = _context3.sent;
          res.json(user);
          _context3.next = 11;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          res.send(_context3.t0);

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 8]]);
}; // to get user by userName to login


exports.userLogin = function _callee4(req, res) {
  var userName, password, user, userjwt, accessToken, refreshToken;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          userName = req.body.userName;
          password = req.body.password;
          _context4.next = 5;
          return regeneratorRuntime.awrap(Users.findOne({
            where: {
              userName: [userName],
              password: [password]
            },
            include: [{
              model: Demandes,
              include: [Types, Statuses]
            }, Holidays]
          }));

        case 5:
          user = _context4.sent;

          if (user) {
            userjwt = {
              name: userName,
              role: user.role
            };
            accessToken = generateAccessToken(userjwt);
            refreshToken = jwt.sign(userjwt, process.env.REFRESH_TOKEN_SECRET);
            res.json({
              user: user,
              accesstoken: accessToken,
              refreshtoken: refreshToken
            });
          } else {
            res.json(null);
          }

          _context4.next = 12;
          break;

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          res.send(_context4.t0);

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.userToken = function _callee5(req, res) {
  var refreshToken;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          refreshToken = req.body.token;

          if (!(refreshToken == null)) {
            _context5.next = 4;
            break;
          }

          return _context5.abrupt("return", res.sendStatus(401));

        case 4:
          if (refreshTokens.includes(refreshToken)) {
            _context5.next = 6;
            break;
          }

          return _context5.abrupt("return", res.sendStatus(403));

        case 6:
          jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, function (err, user) {
            if (err) return res.sendStatus(403); //    const accessToken = generateAccessToken(name: user.userName)
          });
          _context5.next = 12;
          break;

        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](0);
          res.send(_context5.t0);

        case 12:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m'
  });
}

exports.userLogOut = function _callee6(req, res) {
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          refreshTokens = refreshTokens.filter(function (token) {
            return token !== req.body.token;
          });
          res.sendStatus(204);

        case 2:
        case "end":
          return _context6.stop();
      }
    }
  });
}; // to delete user by id


exports.deleteUserById = function _callee7(req, res) {
  var id, holiday, demandes;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          id = req.params.id;
          _context7.next = 4;
          return regeneratorRuntime.awrap(Holidays.findOne({
            where: {
              UserId: [id]
            }
          }));

        case 4:
          holiday = _context7.sent;
          _context7.next = 7;
          return regeneratorRuntime.awrap(Demandes.findAll({
            where: {
              UserId: [id]
            }
          }));

        case 7:
          demandes = _context7.sent;

          if (!holiday) {
            _context7.next = 11;
            break;
          }

          _context7.next = 11;
          return regeneratorRuntime.awrap(Holidays.destroy({
            where: {
              UserId: [id]
            }
          }));

        case 11:
          // if this user has demandes, delete them
          if (demandes) {
            demandes.forEach(function (el) {
              Demandes.destroy({
                where: {
                  UserId: [id]
                }
              });
            });
          } // delete this user


          _context7.next = 14;
          return regeneratorRuntime.awrap(Users.destroy({
            where: {
              id: [id]
            }
          }));

        case 14:
          res.json("user and user's holidays are deleted");
          _context7.next = 20;
          break;

        case 17:
          _context7.prev = 17;
          _context7.t0 = _context7["catch"](0);
          res.send(_context7.t0);

        case 20:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 17]]);
}; // to update user


exports.updateUser = function _callee9(req, res) {
  var id, user, objUser;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          id = req.body.id;
          _context9.next = 4;
          return regeneratorRuntime.awrap(Users.findByPk(id));

        case 4:
          user = _context9.sent;

          if (!user) {
            _context9.next = 12;
            break;
          }

          // si user exists
          objUser = req.body;
          delete objUser.id;
          _context9.next = 10;
          return regeneratorRuntime.awrap(Users.update(objUser, {
            // update user
            where: {
              id: [id]
            },
            returning: true
          }).then(function _callee8() {
            var updatedUser, holiday, holidayUpdate, newUser;
            return regeneratorRuntime.async(function _callee8$(_context8) {
              while (1) {
                switch (_context8.prev = _context8.next) {
                  case 0:
                    _context8.next = 2;
                    return regeneratorRuntime.awrap(Users.findByPk(id));

                  case 2:
                    updatedUser = _context8.sent;
                    _context8.next = 5;
                    return regeneratorRuntime.awrap(Holidays.findByPk(id));

                  case 5:
                    holiday = _context8.sent;
                    holidayUpdate = updateHoliday(updatedUser, holiday);

                    if (holidayUpdate) {
                      Holidays.update(holidayUpdate, {
                        // update user
                        where: {
                          UserId: [id]
                        }
                      });
                    }

                    _context8.next = 10;
                    return regeneratorRuntime.awrap(Users.findByPk(id, {
                      include: [Holidays]
                    }));

                  case 10:
                    newUser = _context8.sent;
                    res.json(newUser);

                  case 12:
                  case "end":
                    return _context8.stop();
                }
              }
            });
          }));

        case 10:
          _context9.next = 13;
          break;

        case 12:
          res.json("user doesn't exist");

        case 13:
          _context9.next = 18;
          break;

        case 15:
          _context9.prev = 15;
          _context9.t0 = _context9["catch"](0);
          res.send(_context9.t0);

        case 18:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 15]]);
};

exports.updateUserHoliday = function _callee10(req, res) {
  var id, updatedUser, holiday, holidayUpdate;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          id = req.params.idUser; // get and return this user after being updated

          _context10.next = 4;
          return regeneratorRuntime.awrap(Users.findByPk(id));

        case 4:
          updatedUser = _context10.sent;
          _context10.next = 7;
          return regeneratorRuntime.awrap(Holidays.findOne({
            where: {
              UserId: [id]
            }
          }));

        case 7:
          holiday = _context10.sent;
          holidayUpdate = updateHoliday(updatedUser, holiday);

          if (holidayUpdate) {
            Holidays.update(holidayUpdate, {
              // update user
              where: {
                UserId: [id]
              }
            });
          }

          res.json(holidayUpdate);
          _context10.next = 16;
          break;

        case 13:
          _context10.prev = 13;
          _context10.t0 = _context10["catch"](0);
          res.send(_context10.t0);

        case 16:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[0, 13]]);
};

function calculateCongesPayes(startingDate) {
  try {
    var fullMonths = new Date().getMonth() - startingDate.getMonth() - 1 + 12 * (new Date().getFullYear() - startingDate.getFullYear()); // to calculate worked days of current month

    var today = new Date();
    var num = today.getDate();
    var daysPast = 0;

    for (var i = 1; i <= num; i++) {
      today.setDate(i);
      var day = today.getDay();

      if (!(day == 0 || day == 6)) {
        daysPast += 1;
      }
    } // to calculate worked days of first working months


    var firstWorkingDay = startingDate.getDate();
    var year = startingDate.getFullYear();
    var month = startingDate.getMonth() + 1;
    var days = new Date(year, month, 0).getDate();
    var daysWorked = 0;

    for (var _i = firstWorkingDay; _i <= days; _i++) {
      startingDate.setDate(_i);

      var _day = startingDate.getDay();

      if (!(_day == 0 || _day == 6)) {
        daysWorked += 1;
      }
    }

    var totalConge = parseFloat(fullMonths * 2.5 + 2.5 / 21 * (daysPast + daysWorked)).toFixed(1);
    return totalConge;
  } catch (error) {
    res.send(error);
  }
}

function updateHoliday(user, holiday) {
  try {
    var role = user.role;

    if (role == 2 || role == 3) {
      // try to update user's holiday if user is employee or manager
      var startingDate = user.firstWorkingDay;
      var dateWorked6months = new Date(new Date(startingDate).setMonth(new Date(startingDate).getMonth() + 6)); // recalculate paid leaves

      if (new Date() >= dateWorked6months) {
        //update user's holiday if user has been working for more than 6 months 
        var totalPaidLeaves = calculateCongesPayes(startingDate);
        var holidaysTaken = holiday.holidaysTaken;
        var holidaysAvailable = totalPaidLeaves - holidaysTaken;
        var holidayUpdate = {
          "holidaysAvailable": holidaysAvailable,
          "holidaysTaken": holidaysTaken
        };
        return holidayUpdate;
      }
    }
  } catch (error) {
    res.send(error);
  }
}
//# sourceMappingURL=users.dev.js.map
