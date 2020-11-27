import { Router } from 'express';
import traineeController from './Controller';
import validationHandler from '../../libs/validationHandler';
import validation from './validation';
import  authMiddleware  from  '../../libs/routes/authMiddleWare';

const traineeRouter = Router();

/**
 * @swagger
 *
 *  definitions:
 *      TraineeCreate:
 *        type: object
 *        properties:
 *          email:
 *              type: string
 *              example: priyankar@successive.tech
 *          name:
 *              type: string
 *              example: priyanka
 *          password:
 *              type: string
 *              example: traine@123
 *          role:
 *               type: string
 *               example: trainee
 *      TraineeResponse:
 *        type: object
 *        properties:
 *          _id:
 *              example: 5e4a36bc64824b1f80b730cd
 *          email:
 *              type: string
 *              example: priyankar@successive.tech
 *          name:
 *              type: string
 *              example: Priyanka
 *          role:
 *              type: string
 *              example: trainee
 *          originalId:
 *              example: 5e4a36bc64824b1f80b730cd
 *          createdAt:
 *              example: 2020-02-20T11:33:39.325Z
 *      Unauthorized:
 *        type: object
 *        properties:
 *          error:
 *              example: Unauthorized
 *          message:
 *              example: Token not found
 *          status:
 *              example: 403
 *          timestamp:
 *               example: 2020-11-25T17:34:37.066Z
 *
 */


traineeRouter.route('/')
/**
 * @swagger
 *
 * /api/trainee:
 *   get:
 *     tags:
 *       - Trainee
 *     description: List of all the trainees
 *     security:
 *       - Bearer: []
 *     consumes:
 *       - application/json
 *     produces:
 *        - application/json
 *     parameters:
 *       - name: skip
 *         description: Number of records to skip
 *         in: query
 *         required: false
 *         type: number
 *       - name: limit
 *         description: number of records to show
 *         in: query
 *         required: false
 *         type: number
 *       - name: sort
 *         description: Parameter to sort (name or email)
 *         in: query
 *         required: false
 *         type: string
 *       - name: sortedBy
 *         description: Elements to sort By(sorting order)
 *         in: query
 *         required: false
 *         type: string
 *       - name: search
 *         description: Element to search
 *         in: query
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: Trainee List
 *         schema:
 *              properties:
 *                  status:
 *                      example: OK
 *                  message:
 *                      example: 'Trainee Fetched Successfully'
 *                  TotalCount:
 *                      example: 10
 *                  TraineeCount:
 *                      example: 2
 *                  data:
 *                      type: object
 *                      allOf:
 *                              - $ref: '#/definitions/TraineeResponse'
 *       403:
 *         description: unauthorised access
 *         schema:
 *              $ref: '#/definitions/Unauthorized'
 */

    .get(authMiddleware('getUsers', 'all'), validationHandler(validation.get), traineeController.getAll)
/**
 * @swagger
 *
 * /api/trainee:
 *   post:
 *     tags:
 *       - Trainee
 *     description: Returns the success reponse on creation
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: User
 *         description: Data of users.
 *         in: body
 *         required: true
 *         type: object
 *         schema:
 *             $ref: '#/definitions/TraineeCreate'
 *     responses:
 *       200:
 *         description: User Created Successfully
 *         schema:
 *              oneOf:
 *              properties:
 *                  status:
 *                      example: OK
 *                  message:
 *                      example: Trainee Created Successfully
 *                  data:
 *                      type: object
 *                      allOf:
 *                          - $ref: '#/definitions/TraineeResponse'
 *                      properties:
 *                              name:
 *                                  type: string
 *                                  example: "Priyanka"
 *       403:
 *         description: unauthorised access
 *         schema:
 *              $ref: '#/definitions/Unauthorized'
 */

    .post(authMiddleware('getUsers', 'read'), validationHandler(validation.create), traineeController.create)
/**
 * @swagger
 *
 * /api/trainee:
 *   put:
 *     tags:
 *       - Trainee
 *     description: Returns the success reponse on Updation
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: User
 *         description: Data of users.
 *         in: body
 *         required: true
 *         type: object
 *         schema:
 *          oneOf:
 *          properties:
 *              id:
 *                  example: 5e4e6e93c095d84d34045a30
 *                  allOf:
 *                      - $ref: '#/definitions/TraineePost'
 *     responses:
 *       200:
 *         description: User Updated Successfully
 *         schema:
 *              oneOf:
 *              properties:
 *                  status:
 *                      example: OK
 *                  message:
 *                      example: successfully upddate
 *                  data:
 *                      type: object
 *                      allOf:
 *                          - $ref: '#/definitions/TraineeResponse'
 *       403:
 *         description: unauthorised access
 *         schema:
 *              $ref: '#/definitions/Unauthorized'
 */
    .put( authMiddleware('getUsers', 'write'), validationHandler(validation.update), traineeController.update);
/**
 * @swagger
 *
 * /api/trainee/{id}:
 *   delete:
 *     tags:
 *       - Trainee
 *     description: Returns the success reponse on deletion
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: OriginalID of user to be deleted.
 *         in: query
 *         required: true
 *         type: string
 *         example: 5e4e6e93c095d84d34045a30
 *     responses:
 *       200:
 *         description: Data to be deleted
 *         schema:
 *              oneOf:
 *              properties:
 *                  status:
 *                      example: OK
 *                  message:
 *                      example: Trainee deleted successfully!
 *                  code:
 *                      example: 200
 *       403:
 *         description: unauthorised access
 *         schema:
 *              $ref: '#/definitions/Unauthorized'
 */

    traineeRouter.route('/:id')
    .delete(authMiddleware('getUsers', 'delete'), validationHandler(validation.delete), traineeController.delete);

export default traineeRouter;
