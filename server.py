import glob
import sys
sys.path.append('gen-py')

from tutorial import TokenService
from thrift.transport import TSocket
from thrift.transport import TTransport
from thrift.protocol import TBinaryProtocol
from thrift.server import TServer
import json


class TokenServiceHandler:
    def __init__(self):
        self.log = {}

    def sendtoken(self, token):
        print(token)
        return json.dumps({'user': {'id': 1}, 'device': {}})


if __name__ == '__main__':
    handler = TokenServiceHandler()
    processor = TokenService.Processor(handler)
    transport = TSocket.TServerSocket(port=9090)
    tfactory = TTransport.TBufferedTransportFactory()
    pfactory = TBinaryProtocol.TBinaryProtocolFactory()

    server = TServer.TSimpleServer(processor, transport, tfactory, pfactory)
    server.serve()