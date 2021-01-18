
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import sys


dataset = pd.read_csv('sample_data/sample_data1.csv')
X = dataset.iloc[:, :-1].values
y = dataset.iloc[:, -1].values
y = y.reshape(len(y),1)

found = False
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
for i in range(len(X[1, :])):
    if isinstance(X[1, i], str):
        found = True
        ct = ColumnTransformer(transformers=[('encoder', OneHotEncoder(), [i])], remainder='passthrough')
        X = np.array(ct.fit_transform(X))


from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2, random_state = 0)


from sklearn.preprocessing import StandardScaler
sc_X = StandardScaler()
sc_y = StandardScaler()
X_train = sc_X.fit_transform(X_train)
y_train = sc_y.fit_transform(y_train)


from sklearn.svm import SVR
regressor = SVR(kernel = 'rbf')
regressor.fit(X_train, y_train)

y_pred = sc_y.inverse_transform(regressor.predict(sc_X.transform(X_test)))
np.set_printoptions(precision=2)
np.set_printoptions(threshold=np.inf)
print(np.concatenate((y_pred.reshape(len(y_pred),1), y_test.reshape(len(y_test),1)),1))


from sklearn.metrics import r2_score
rval = r2_score(y_test, y_pred)*100
print('Model Type: Support Vector Regression')
print('R-value = {0:.2f}'.format(rval))
print('Test size = 0.2')
if found is True:
    print('Encoders: One Hot Encoder')
else:
    print('Encoders: None')